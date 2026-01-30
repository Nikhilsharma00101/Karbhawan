import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export async function sendOTPEmail(email: string, code: string): Promise<void> {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Karbhawan Login Code</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0e1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Logo Section -->
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0;">
                    KARBHAWAN
                </h1>
                <div style="width: 60px; height: 3px; background: #14b8a6; margin: 12px auto; border-radius: 2px;"></div>
            </div>

            <!-- Main Card -->
            <div style="background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);">
                <!-- Title -->
                <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 16px 0; text-align: center;">
                    Your Login Code
                </h2>
                
                <p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
                    Use this code to complete your sign-in to Karbhawan
                </p>

                <!-- OTP Code -->
                <div style="background: rgba(20, 184, 166, 0.1); border: 2px solid #14b8a6; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                    <div style="font-size: 48px; font-weight: bold; letter-spacing: 12px; text-align: center; color: #14b8a6; font-family: monospace;">
                        ${code}
                    </div>
                </div>

                <!-- Expiration Notice -->
                <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid #fbbf24; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                    <p style="color: #fbbf24; margin: 0; font-size: 14px;">
                        ⏱️ This code will expire in 10 minutes
                    </p>
                </div>

                <!-- Security Notice -->
                <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 16px; border-radius: 8px;">
                    <p style="color: #ef4444; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">
                        🔒 Security Notice
                    </p>
                    <p style="color: #f87171; margin: 0; font-size: 13px; line-height: 1.5;">
                        Never share this code with anyone. Karbhawan staff will never ask for this code.
                    </p>
                </div>
            </div>

            <!-- Didn't Request? -->
            <div style="text-align: center; margin-top: 32px;">
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                    Didn't request this code? You can safely ignore this email.
                </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #475569; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} Karbhawan. Premium Automotive Accessories.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
        from: `"Karbhawan" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "Your Karbhawan Login Code",
        html: htmlTemplate,
        text: `Your Karbhawan login code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, you can safely ignore this email.`,
    });
}

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
