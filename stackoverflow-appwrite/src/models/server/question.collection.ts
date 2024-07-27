import { IndexType, Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";

async function createQuestionsCollection() {
    try {
        await databases.createCollection(
            db,
            questionCollection,
            questionCollection,
            [
                Permission.read("any"),
                Permission.read("users"),
                Permission.create("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ],
        );
        console.log("Questions collection is created successfully");

        await databases.createStringAttribute(
            db,
            questionCollection,
            "title",
            100,
            true,
        );
        await databases.createStringAttribute(
            db,
            questionCollection,
            "content",
            10000,
            true,
        );
        await databases.createStringAttribute(
            db,
            questionCollection,
            "authorId",
            60,
            true,
        );
        await databases.createStringAttribute(
            db,
            questionCollection,
            "tags",
            100,
            true,
            undefined,
            true,
        );

        await databases.createStringAttribute(
            db,
            questionCollection,
            "attachmentId",
            60,
            false,
        );

        console.log("Questions collection attributes are created successfully");

        await Promise.all([
            databases.createIndex(
                db,
                questionCollection,
                "title",
                IndexType.Fulltext,
                ["title"],
                ["asc"],
            ),

            databases.createIndex(
                db,
                questionCollection,
                "content",
                IndexType.Fulltext,
                ["content"],
                ["asc"],
            ),
        ]);

        console.log("Questions collection indexes are created successfully");
    } catch (error) {
        console.log("Err occured while creating question collection", error);
    }
}

export default createQuestionsCollection;