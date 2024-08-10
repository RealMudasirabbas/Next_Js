import {GoogleGenerativeAI} from "@google/generative-ai"
import { NextResponse } from "next/server";

const client = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const model = client.getGenerativeModel({
    model: "gemini-1.5-flash",
});

export async function POST(request: Request) {
    const prompt =
        "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    try {
      const {response} = await model.generateContent(prompt)
      return NextResponse.json({
        success: true,
        message: response?.candidates?.[0].content.parts[0].text
      },{
        status: 200
      })
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: error
      },{
        status: 500
      })
    }
}