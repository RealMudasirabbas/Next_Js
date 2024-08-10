import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/signup", "/signin","/home"]);
const isPublicApiRoute = createRouteMatcher(["/api/videos"]);


export default clerkMiddleware((auth,req) => {
  const {userId} = auth();
  const currentUrl = new URL(req.url)
  const isHome = currentUrl.pathname === "/home";
  const isApiRequest = currentUrl.pathname.startsWith("/api");
  
  if (userId && isPublicRoute(req) && !isHome) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!userId) {
      if (!isPublicApiRoute(req) && !isPublicRoute(req)) {
          return NextResponse.redirect(new URL("/signin", req.url));
        
      }

      if (isApiRequest && !isPublicApiRoute(req)) {
          return NextResponse.redirect(new URL("/signin", req.url));
        
      }

    }
    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
