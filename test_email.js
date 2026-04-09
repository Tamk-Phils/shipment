require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function test() {
    console.log("Creating transporter with:", {
        host: process.env.SMTP_HOST || "smtp.spaceship.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        user: process.env.SMTP_USER,
        fromEmail: process.env.FROM_EMAIL
    });

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.spaceship.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        logger: true,
        debug: true
    });

    try {
        console.log("Verifying connection...");
        await transporter.verify();
        console.log("Connection verified successfully!");

        console.log("Attempting to send test email...");
        const info = await transporter.sendMail({
            from: `"${process.env.FROM_NAME || "Tracking Support"}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // send to self
            subject: "SMTP Test Verification",
            text: "This is a test email to verify SMTP configuration.",
        });

        console.log("Message sent:", info.messageId);
    } catch (error) {
        console.error("SMTP Error Details:", error);
    }
}

test();
