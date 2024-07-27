import env from "@/app/env";
import {Databases,Client,Users,Avatars,Storage} from "node-appwrite"

const client = new Client();

client
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId)
    .setKey(env.appwrite.apikey)

const databases = new Databases(client);
const users = new Users(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { databases, users, storage, avatars };
