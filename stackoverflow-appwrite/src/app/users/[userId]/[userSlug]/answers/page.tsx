import Pagination from "@/components/Pagination";
import { MarkdownPreview } from "@/components/RTE";
import { answersCollection, db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import slugify from "@/utils/slugify";
import Link from "next/link";
import { Query } from "node-appwrite";
import React from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: { userId: string; userSlug: string };
  searchParams: { page?: string };
}) => {
  searchParams.page ||= "1";

  try {
    // Define the queries to fetch answers
    const queries = [
      Query.equal("authorId", params.userId),
      Query.orderDesc("$createdAt"),
      Query.offset((+searchParams.page - 1) * 25),
      Query.limit(25),
    ];

    // Fetch answers from the database
    const answers = await databases.listDocuments(
      db,
      answersCollection,
      queries
    );
    console.log("Answers response:", answers);

    // Fetch additional details for each answer
    answers.documents = await Promise.all(
      answers.documents.map(async (ans) => {
        try {
          // Fetch the associated question details
          const question = await databases.getDocument(
            db,
            questionCollection,
            ans.questionId,
            [Query.select(["title"])]
          );
          return { ...ans, question };
        } catch (error) {
          console.error(
            `Error fetching details for question ${ans.questionId}:`,
            error
          );
          return { ...ans, question: { title: "Unknown Question" } };
        }
      })
    );

    return (
      <div className="px-4">
        <div className="mb-4">
          <p>{answers.total} answers</p>
        </div>
        <div className="mb-4 max-w-3xl space-y-6">
          {answers.documents.length > 0 ? (
            answers.documents.map((ans) => (
              <div key={ans.$id}>
                <div className="max-h-40 overflow-auto">
                  <MarkdownPreview
                    source={ans.content}
                    className="rounded-lg p-4"
                  />
                </div>
                <Link
                  href={`/questions/${ans.questionId}/${slugify(
                    ans.question.title
                  )}`}
                  className="mt-3 inline-block shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
                >
                  Question
                </Link>
              </div>
            ))
          ) : (
            <p>No answers found.</p>
          )}
        </div>
        <Pagination total={answers.total} limit={25} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data. Please try again later.</div>;
  }
};

export default Page;
