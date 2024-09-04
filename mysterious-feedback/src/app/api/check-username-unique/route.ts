import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";
import { NextResponse } from "next/server"; // Adjust based on your framework

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  try {
    await dbConnect();
    console.log("Database connected successfully");

    const { searchParams } = new URL(request.url);
    console.log("Parsed search parameters:", searchParams);

    const queryParam = {
      username: searchParams.get("username"),
    };
    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const userNameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message:
            userNameErrors.length > 0
              ? userNameErrors.join(",")
              : "Invalid Query Parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    console.log("Validated username:", username);

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    console.log("Database query result:", existingVerifiedUser);

    if (existingVerifiedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "Username is available",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error occurred during checking username", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error occurred during checking username",
      },
      {
        status: 500,
      }
    );
  }
}
