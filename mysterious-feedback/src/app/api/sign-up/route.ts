import dbConnect from '@/lib/db/dbConnect';
import UserModel from '@/model/User.model';
import bcryptjs from 'bcryptjs';
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function POST(request: Request): Promise<ApiResponse> {
    try {
        await dbConnect()
        const {username,email,password} = await request.json()
        await UserModel.find()
        return {
            success: true,
            message: "User registered Successfuly",
        }

    } catch (error) {
        console.error('Error occur while registering the user', error);
        return {
            success: false,
            message: 'Registering a user failed',
            status: 500
        };
    }
}
