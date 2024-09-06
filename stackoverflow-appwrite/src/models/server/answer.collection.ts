import { Permission } from "node-appwrite";
import { answersCollection, db } from "../name";
import { databases } from "./config";

async function createAnswersCollection() {
    try {
        await databases.createCollection(
            db,
            answersCollection,
            answersCollection,
            [
                Permission.read("any"),
                Permission.read("users"),
                Permission.create("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ],
        );
        console.log("Answers collection is created successfully");

        await databases.createStringAttribute(
            db,
            answersCollection,
            "content",
            10000,
            true,
        );
        await databases.createStringAttribute(
            db,
            answersCollection,
            "questionId",
            60,
            true,
        );
        await databases.createStringAttribute(
            db,
            answersCollection,
            "authorId",
            60,
            true,
        );

        console.log("Answers collection attributes are created successfully");
    } catch (error) {
        console.log("Err occured while creating question collection", error);
    }
}

export default createAnswersCollection;
