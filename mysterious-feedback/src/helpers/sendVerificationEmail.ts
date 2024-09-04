import { resend } from '@/lib/resend-email/resendEmail';
import VerificationEmail from '../../emails/verificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: "mudasirabbas5638201@gmail.com",
            subject: 'Mystery Feedback | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        return {
            success: true,
            message: 'Verification Email sent Successfully',
        };
    } catch (emailError) {
        console.error(
            'Error occured while sending Verification Email',
            emailError,
        );
        return {
            success: false,
            message: 'Verification Email failed. Try Again',
        };
    }
}
