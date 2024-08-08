import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get("username"),
        };
        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(request);
        if (!result.success) {
            const userNameErrors =
                result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message:
                        userNameErrors?.length > 0
                            ? userNameErrors.join(",")
                            : "Invalid Query Parameters",
                },
                { status: 400 },
            );
        }

        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken",
                },
                { status: 400 },
            );
        } else {
            return Response.json(
                {
                    success: true,
                    message: "Username is available",
                },
                { status: 200 },
            );
        }
    } catch (error) {
        console.error("Error occured during checking username", error);
        return Response.json(
            {
                success: false,
                error: "Error occured during checking username",
            },
            {
                status: 500,
            },
        );
    }
}
