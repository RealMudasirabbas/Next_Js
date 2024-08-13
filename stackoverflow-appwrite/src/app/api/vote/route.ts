import { answersCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const {type,typeId,votedById,voteStatus} = await request.json();
        const response = await databases.listDocuments(db,voteCollection,[
            Query.equal("type",type),
            Query.equal("typeId",typeId),
            Query.equal("votedById",votedById),
            Query.equal("voteStatus",voteStatus),
        ])

        if (response.documents.length > 0) {
            await databases.deleteDocument(db,voteCollection,response.documents[0].$id)

            const questionOrAnswer = await databases.getDocument(db,
                type === "question" ? questionCollection : answersCollection,
                typeId
            )

            await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId,{
                reputation: response.documents[0].voteStatus === "upvoted" ? Number(questionOrAnswer.reputation) - 1 : Number(questionOrAnswer.reputation) + 1
            })
        }

        if (response.documents[0]?.voteStatus !== voteStatus) {
            const doc = await databases.createDocument(db,voteCollection,ID.unique(),{
                type,
                typeId,
                votedById,
                voteStatus
            })

            const questionOrAnswer = await databases.getDocument(db,
                type === "question" ? questionCollection : answersCollection,
                typeId
            )

            const authorPrefs = await users.getPrefs<UserPrefs>(questionOrAnswer.authorId)

            if (response.documents[0]) {
                await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
                    reputation:
                        response.documents[0].voteStatus === "upvoted"
                            ? Number(authorPrefs.reputation) + 1
                            : Number(authorPrefs.reputation) - 1,
                });
            } else {
                await users.updatePrefs<UserPrefs>(
                    questionOrAnswer.authorId,
                    {
                        reputation: voteStatus === "upvoted"
                                ? Number(authorPrefs.reputation) + 1
                                : Number(authorPrefs.reputation) - 1,
                    },
                );
            }
        }

        const [upvotes, downvotes] = await Promise.all([
            databases.listDocuments(db,voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("votedById",votedById),
                Query.equal("voteStatus","upvoted"),
                Query.limit(1)
            ]),

            databases.listDocuments(db,voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("votedById",votedById),
                Query.equal("voteStatus","downvoted"),
                Query.limit(1)
            ])
        ])

        return NextResponse.json({
            data: {
                documents: null,
                voteResult: upvotes.total = downvotes.total,
                message: "Vote handled successfully",
            }
        },{status:200});

    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Error occured while creating vote" },
            { status: error?.status || error?.code || 500 },
        );
    }
}
