import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

const sendMailer = async ({ email, emailType, userId }) => {
  try {
    // Generate a token based on the userId
    console.log("request:sendmaile",email);
    const hashToken = await bcrypt.hash(userId.toString(), 10);
    
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, 
        {
         $set: {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000 // 1 hour
      }
    });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, 
        {
          $set: {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
      }
    });
    } else {
      throw new Error('Invalid emailType');
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
      text: `Hello, please use the following link to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}.`,
      html: `
        <p>Hello,</p>
        <p>Please ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} by clicking <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'newpassword'}?token=${hashToken}">here</a>.</p>
        <p>Or copy and paste the link below in your browser:</p>
        <p>${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashToken}</p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Email sent successfully");
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default sendMailer;