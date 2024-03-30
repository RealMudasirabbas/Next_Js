import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        // validation
        console.log(reqBody);
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 404 },
            );
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token =  jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
            expiresIn: '1d',
        });

        const response = NextResponse.json({
            message: "Logged In Successfully",
            success: true
        })

response.cookies.set("token", token,{
    httpOnly: true,
})
return response



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
