import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

async function registerUser(request, response) {
    const { username, email, password } = request.body;

    const isUserAlreadyExists = await userModel.findOne({ $or: [{ username }, { email }] });

    if (isUserAlreadyExists) {
        return response.status(400).json({
            success: false,
            message: "Username or email already exists",
            err: "User already exists"
        });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hash });

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity",
        html: `<p>Hello ${username},</p><p>Thank you for registering at <strong>Perplexity</strong>! We're excited to have you on board.</p><p>Best regards,<br>The Perplexity Team</p>`
    })

    response.status(201).json({
        message: "user registered successfully",
        status: true,
        user: {
            username: user.username,
            email: user.email
        }
    })
}

export default registerUser;
