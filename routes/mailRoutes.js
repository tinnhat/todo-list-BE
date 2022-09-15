import express from "express";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import User from "../model/user.js";

export const mailRoutes = express.Router();
// Tạo API /email/send với method POST

const GOOGLE_MAILER_CLIENT_ID =
  "985902840893-op3bof7cak7i9balko5q8ogfu5bcr9h6.apps.googleusercontent.com";
const GOOGLE_MAILER_CLIENT_SECRET = "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";
const GOOGLE_MAILER_REFRESH_TOKEN =
  "1//04D0cnbn8z5vUCgYIARAAGAQSNwF-L9IrATN40_vMm5zQ1pRFymfiPXbngVfX9AZsxbEKiSoMB4pxxfWpqN2XVBG2u1u5Znhkg64";
const ADMIN_EMAIL_ADDRESS = "tinnhat0412@gmail.com";
// Set Refresh Token vào OAuth2Client Credentials
const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});
mailRoutes.post("/send", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({ message: "Email not found" });
  } else {
    try {
      // Lấy thông tin gửi lên từ client qua body
      const { email } = req.body;
      if (!email) throw new Error("Please provide email !");
      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
      const myAccessToken = myAccessTokenObject?.token;
      // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: ADMIN_EMAIL_ADDRESS,
          clientId: GOOGLE_MAILER_CLIENT_ID,
          clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      });
      // mailOption là những thông tin gửi từ phía client lên thông qua API
      const mailOptions = {
        to: email, // Gửi đến ai?
        subject: "Change Password", // Tiêu đề email
        html: `alo alo`, // Nội dung email
      };
      // Gọi hành động gửi email
      await transport.sendMail(mailOptions);
      // Không có lỗi gì thì trả về success
      res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
      // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
      console.log(error);
      res.status(500).json({ errors: error.message });
    }
  }
});
