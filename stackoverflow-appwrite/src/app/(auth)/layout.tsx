"use client";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function Layout({ children }: { children: React.ReactNode }) {
    const {session} = useAuthStore();
    const router = useRouter();

    // if session exists, redirect to home page
    useEffect(() => {

      if (session) {
        router.push("/");
      }


    },[session,router])

    // if session exists, hide the layout
    if (session) {
      return null
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
            <div className="relative">{children}</div>
        </div>
    ); 
}

export default Layout;
