import { answersCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const { questionId, answer, authorId } = await request.json();
        const response = await databases.createDocument(
            db,
            answersCollection,
            ID.unique(),
            {
                content: answer,
                questionId,
                authorId,
            },
        );

        const prefs = await users.getPrefs<UserPrefs>(authorId);
        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) + 1,
        });

        return NextResponse.json(response, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error?.message || "Error occured while creating answer",
            },
            {
                status: error?.status || error?.code || 500,
            },
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { answerId } = await request.json();
        const answer = await databases.getDocument(
            db,
            answersCollection,
            answerId,
        );
        const response = await databases.deleteDocument(
            db,
            answersCollection,
            answerId,
        );

        const prefs = await users.getPrefs<UserPrefs>(answer.authorId);
        await users.updatePrefs(answer.authorId, {
            reputation: Number(prefs.reputation) - 1,
        });
        return NextResponse.json(
            {
                data: response,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error?.message || "Error occured while deleting answer",
            },
            {
                status: error?.status || error?.code || 500,
            },
        );
    }
}
