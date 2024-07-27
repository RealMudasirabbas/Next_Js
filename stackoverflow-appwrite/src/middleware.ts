import { NextRequest,NextResponse } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

export default async function middleware(request: NextRequest) {

    await Promise.all([
        getOrCreateDB(),
        getOrCreateStorage()
    ])
    return NextResponse.next();

}

export const config = {
    // generate regex for including route startswith\ -api,- _next/static, -_next/image,favicon.com

    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}