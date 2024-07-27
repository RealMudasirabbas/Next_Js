import env from "@/app/env";
import {Databases,Avatars,Account,Client,Storage} from "appwrite"

const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setEndpoint(env.appwrite.projectId)

    const databases = new Databases(client);
    const account = new Account(client);
    const storage = new Storage(client);
    const avatars = new Avatars(client);

    export {databases,account,storage,avatars}