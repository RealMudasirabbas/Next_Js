import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mystery Feedback",
  description: "A web app that helps you get feedback from anoymous users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      

      <body className={inter.className}>
        <Navbar />
        {children}
      
      </body>
      
    </html>
  );
}
