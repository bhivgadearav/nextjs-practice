import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async (email: string, emailType: any, userID: any) => {
    try {
        const hashedToken  = await bcryptjs.hash(userID.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD
            }
        });
        const mailOptions = {
            from: "arav@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> ${emailType == 'VERIFY' ? "to verify your email" : "reset your password" }
            or copy paste this in your browser ${process.env.DOMAIN}/verifyemail?token=${hashedToken}.</p>`
        }
        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message);
    }
}