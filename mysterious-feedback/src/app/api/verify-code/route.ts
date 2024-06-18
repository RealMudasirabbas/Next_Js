import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User.model";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json();
        const decodedUserName = decodeURIComponent(username);

        const user = await UserModel.findOne({
            username: decodedUserName,
        });

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User could not be found",
                },
                {
                    status: 404,
                },
            );
        }

        const isValidCode = user.verifyCode === code;
        const isVerifyCodeNotExpired =
            new Date(user.verifyCodeExpiry) > new Date();

        if (isValidCode && isVerifyCodeNotExpired) {
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success: true,
                    error: "User verified successfully",
                },
                {
                    status: 200,
                },
            );
        } else if (!isVerifyCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verify code expired. Please Sign up again!",
                },
                {
                    status: 400,
                },
            );
        } else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect Verify Code",
                },
                {
                    status: 400,
                },
            );
        }
    } catch (error) {
        console.error("Error occured during checking verifying User", error);
        return Response.json(
            {
                success: false,
                error: "Error occured during checking verifying User",
            },
            {
                status: 500,
            },
        );
    }
}
