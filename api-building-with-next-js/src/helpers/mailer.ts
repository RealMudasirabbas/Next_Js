import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                },
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                },
            });
        }

        const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'd5a7e1b6756968',
                pass: 'cb52a1770f7ada',
            },
        });

        const emailVerifyLink = `<p>Click <a href=${
            process.env.DOMAIN
        }/verifyemail?token=${hashedToken}>here</a> to ${
            emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password'
        } or copy and paste the link below in your browser.<br></p>`;

        const resetPasswordLink = `<p>Click <a href=${
            process.env.DOMAIN
        }/resetpassword?token=${hashedToken}>here</a> to ${
            emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password'
        } or copy and paste the link below in your browser.<br></p>`;

        const mailOptions = {
            from: 'mudasirabbas5638201@gmail.com',
            to: email,
            subject:
                emailType === 'VERIFY' ? 'Verify Email' : 'Reset your Password',
            html: `${
                emailType === 'VERIFY' ? emailVerifyLink : resetPasswordLink
            }`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
