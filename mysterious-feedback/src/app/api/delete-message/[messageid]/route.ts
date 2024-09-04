import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/User.model";

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      messageid: string;
    };
  }
) {
  const messageId = params.messageid;
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const user = session.user as User;

  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      {
        $pull: {
          messages: {
            _id: messageId,
          },
        },
      }
    );

    if (updatedResult.modifiedCount === 0) {
      return NextResponse.json(
        {
          message: "Message not found or already deleted",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Message deleted", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error occurred while deleting message", error);
    return NextResponse.json(
      { success: false, message: "Error occurred while deleting message" },
      { status: 500 }
    );
  }
}
