import { Permission } from "node-appwrite";
import { storage } from "./config";
import { questionAttachmentBucket } from "../name";

async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage connected successfully");
        

    } catch (error) {

        try {
            await storage.createBucket(
                questionAttachmentBucket,
                questionAttachmentBucket,
                [
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.create("users"),
                    Permission.update("users"),
                    Permission.delete("users")],
                    false,
                    false,
                    undefined,
                    ["jpg","png","jpeg","gif","webp","heic","svg"],
            )

            console.log("Storage created successfully");
            
        } catch (error) {
            console.log("Error occured while creating storage",error);
            
        }
    }
}

export default getOrCreateStorage