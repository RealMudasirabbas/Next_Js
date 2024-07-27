import createQuestionsCollection from "./question.collection";
import createAnswersCollection from "./answer.collection";
import createCommentsCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";
import { db } from "../name";

async function getOrCreateDB() {
    try {
        await databases.get(db);
        console.log("Database connected successfully");
    } catch (error) {
        
        try {
            await databases.create(db,db);
            console.log("Database created successfully");

            await Promise.all([
                createQuestionsCollection(),
                createAnswersCollection(),
                createCommentsCollection(),
                createVoteCollection()
            ])

            console.log("All collections are created successfully");

        } catch (error) {
            console.log("Error occured while creating database",error);
            
        }
    }

    return databases;
}

export default getOrCreateDB;
