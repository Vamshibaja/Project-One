import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail", // or 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});
// console.log(`user:${process.env.EMAIL_USER!},pass:${process.env.EMAIL_PASS!}`);
// const logoPath = path.resolve(__dirname, "../assets/RealCollab Logo.png");
export async function sendEmail(to: string, subject: string, otp: string) {
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Email</title>
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif; background-color: rgb(240, 240, 245); padding: 20px; margin: 0">
    <div style="max-width: 600px; margin: auto; background-color: rgb(255, 255, 255); border-radius: 8px; overflow: hidden">
      <div style="padding: 20px; text-align: center; margin-top: -20px">
        <p style="font-size: 16px; color: #111">We received a login attempt for your account.</p>
        <p style="font-size: 16px; color: #111">Please enter the following <strong>One-Time Password (OTP)</strong> to proceed:</p>
        <div
          style="
            display: inline-block;
            background-color: rgb(4, 4, 4);
            padding: 10px 10px;
            border-radius: 8px;
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #fff;
          "
        >
          ${otp}
        </div>
        <p style="font-size: 16px; color: #5e5e5e; margin-top: 10px">
          If you did not attempt to log in, please ignore this email or contact our support team immediately.
        </p>
      </div>
    </div>
  </body>
</html>

`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    // attachments: [
    //   {
    //     filename: "logo.png",
    //     path: logoPath,
    //     cid: "logoImage",
    //   },
    // ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
