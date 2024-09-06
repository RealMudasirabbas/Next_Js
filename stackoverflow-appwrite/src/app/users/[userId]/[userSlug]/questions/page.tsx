import Pagination from "@/components/Pagination";
import QuestionCard from "@/components/QuestionCard";
import {
  answersCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
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
    // Define the queries to fetch questions
    const queries = [
      Query.equal("authorId", params.userId),
      Query.orderDesc("$createdAt"),
      Query.offset((+searchParams.page - 1) * 25),
      Query.limit(25),
    ];

    // Fetch questions from the database
    const questions = await databases.listDocuments(
      db,
      questionCollection,
      queries
    );
    console.log("Questions response:", questions);

    // Fetch additional details for each question
    questions.documents = await Promise.all(
      questions.documents.map(async (ques) => {
        try {
          // Fetch author details, answers, and votes
          const [author, answers, votes] = await Promise.all([
            users.get<UserPrefs>(ques.authorId),
            databases.listDocuments(db, answersCollection, [
              Query.equal("questionId", ques.$id),
              Query.limit(1), // For optimization
            ]),
            databases.listDocuments(db, voteCollection, [
              Query.equal("type", "question"),
              Query.equal("typeId", ques.$id),
              Query.limit(1), // For optimization
            ]),
          ]);

          return {
            ...ques,
            totalAnswers: answers.total,
            totalVotes: votes.total,
            author: {
              $id: author.$id,
              reputation: author.prefs.reputation,
              name: author.name,
            },
          };
        } catch (error) {
          console.error(
            `Error fetching details for question ${ques.$id}:`,
            error
          );
          return {
            ...ques,
            totalAnswers: 0,
            totalVotes: 0,
            author: { $id: "", reputation: 0, name: "" },
          };
        }
      })
    );

    return (
      <div className="px-4">
        <div className="mb-4">
          <p>{questions.total} questions</p>
        </div>
        <div className="mb-4 max-w-3xl space-y-6">
          {questions.documents.length > 0 ? (
            questions.documents.map((ques) => (
              <QuestionCard key={ques.$id} ques={ques} />
            ))
          ) : (
            <p>No questions found.</p>
          )}
        </div>
        <Pagination total={questions.total} limit={25} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data. Please try again later.</div>;
  }
};

export default Page;
