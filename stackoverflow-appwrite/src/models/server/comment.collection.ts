import { IndexType, Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

async function createCommentsCollection() {
    try {
        await databases.createCollection(
            db,
            commentCollection,
            commentCollection,
            [
                Permission.read("any"),
                Permission.read("users"),
                Permission.create("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ],
        );
        console.log("Comments collection is created successfully");

        await databases.createStringAttribute(
            db,
            commentCollection,
            "content",
            10000,
            true,
        );
        await databases.createEnumAttribute(db, commentCollection, "type", [
            "answer","question"
        ], true);
        await databases.createStringAttribute(
            db,
            commentCollection,
            "typeId",
            60,
            true,
        );
        await databases.createStringAttribute(
            db,
            commentCollection,
            "authorId",
            60,
            true,
        );

        console.log("Comments collection attributes are created successfully");
    } catch (error) {
        console.log("Err occured while creating question collection", error);
    }
}

export default createCommentsCollection;
