import nodemailer from 'nodemailer';

export const sendmail = async ({ email, emailType, userId }: any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'maddison53@ethereal.email',
                pass: 'jn7jnAPss4f63QBp6D',
            },
        });

        const mailOptions = {
            from: 'mudasirabbas5638201@gmail.com',
            to: email,
            subject:
                emailType === 'VERIFY' ? 'Verify Email' : 'Reset your Password',
            html: '<b>Hello world?</b>',
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
