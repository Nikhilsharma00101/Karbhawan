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

export async function sendNewsletterEmail(email: string, subject: string, htmlContent: string): Promise<void> {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>${subject}</title>
        <style>
            :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
            }
            body {
                margin: 0;
                padding: 0;
                width: 100% !important;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                background-color: #f8fafc;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }
            .wrapper {
                width: 100%;
                background-color: #f8fafc;
                padding: 40px 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
                border: 1px solid #e2e8f0;
            }
            .header {
                background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
                padding: 40px 30px;
                text-align: center;
                border-bottom: 4px solid #38bdf8;
            }
            .logo {
                font-size: 32px;
                font-weight: 900;
                color: #ffffff;
                margin: 0;
                letter-spacing: 3px;
                text-transform: uppercase;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .logo-subtitle {
                color: rgba(255, 255, 255, 0.8);
                font-size: 13px;
                letter-spacing: 1px;
                margin-top: 8px;
                text-transform: uppercase;
                font-weight: 600;
            }
            .content-area {
                padding: 40px;
                color: #1e293b;
                font-size: 16px;
                line-height: 1.8;
                background-color: #ffffff;
            }
            
            /* Tiptap HTML Content Styling */
            .content-area h1 {
                color: #0f172a;
                font-size: 28px;
                font-weight: 800;
                margin: 0 0 20px 0;
                line-height: 1.3;
                letter-spacing: -0.5px;
            }
            .content-area h2 {
                color: #1e293b;
                font-size: 24px;
                font-weight: 700;
                margin: 32px 0 16px 0;
                line-height: 1.4;
            }
            .content-area h3 {
                color: #334155;
                font-size: 20px;
                font-weight: 600;
                margin: 28px 0 16px 0;
            }
            .content-area p {
                margin: 0 0 20px 0;
                color: #334155;
            }
            .content-area p:last-child {
                margin-bottom: 0;
            }
            .content-area a {
                color: #0ea5e9;
                text-decoration: none;
                font-weight: 500;
                border-bottom: 2px solid transparent;
                transition: border-color 0.2s;
            }
            .content-area a:hover {
                border-color: #0ea5e9;
            }
            .content-area ul, .content-area ol {
                margin: 0 0 24px 0;
                padding-left: 24px;
                color: #334155;
            }
            .content-area li {
                margin-bottom: 10px;
            }
            .content-area blockquote {
                border-left: 4px solid #0ea5e9;
                background: #f0f9ff;
                margin: 0 0 24px 0;
                padding: 20px;
                border-radius: 0 12px 12px 0;
                color: #0f172a;
                font-style: italic;
                font-weight: 500;
            }
            .content-area img {
                max-width: 100%;
                height: auto;
                border-radius: 12px;
                margin: 24px 0;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .content-area mark {
                background-color: #fef08a;
                padding: 2px 4px;
                border-radius: 4px;
            }
            .content-area u {
                text-decoration-thickness: 2px;
                text-decoration-color: #0ea5e9;
                text-underline-offset: 2px;
            }

            .footer {
                background-color: #0f172a;
                padding: 40px 30px;
                text-align: center;
                border-top: 1px solid #1e293b;
            }
            .footer-links {
                margin-bottom: 24px;
            }
            .footer-links a {
                color: #94a3b8;
                text-decoration: none;
                margin: 0 12px;
                font-size: 14px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .footer-text {
                color: #64748b;
                font-size: 13px;
                line-height: 1.6;
                margin: 0 0 12px 0;
            }

            /* Dark mode media query for email clients that support it */
            @media (prefers-color-scheme: dark) {
                body, .wrapper {
                    background-color: #0B1120 !important;
                }
                .container {
                    background: #1e293b !important;
                    border-color: #334155 !important;
                    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5) !important;
                }
                .content-area {
                    background-color: #1e293b !important;
                    color: #cbd5e1 !important;
                }
                .content-area h1 { color: #f8fafc !important; }
                .content-area h2 { color: #f1f5f9 !important; }
                .content-area h3 { color: #e2e8f0 !important; }
                .content-area p, .content-area ul, .content-area ol { color: #cbd5e1 !important; }
                .content-area blockquote {
                    background: rgba(14, 165, 233, 0.1) !important;
                    color: #e0f2fe !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <!-- Header with Gradient & Logo -->
                <div class="header">
                    <h1 class="logo">KARBHAWAN</h1>
                    <div class="logo-subtitle">Premium Auto Accessories</div>
                </div>

                <!-- Main Content Area -->
                <div class="content-area">
                    ${htmlContent}
                </div>

                <!-- Beautiful Dark Footer -->
                <div class="footer">
                    <div class="footer-links">
                        <a href="#">Store</a>
                        <a href="#">Services</a>
                        <a href="#">Contact</a>
                    </div>
                    
                    <p class="footer-text">
                        You are receiving this exclusive update because you subscribed to the Karbhawan newsletter.
                    </p>
                    <p class="footer-text">
                        © ${new Date().getFullYear()} Karbhawan Automotive. Delhi's Finest Auto Store.<br>
                        All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    // Extract raw text for fallback by stripping HTML tags
    const textContent = htmlContent.replace(/<[^>]*>?/gm, '');

    await transporter.sendMail({
        from: `"Karbhawan Automotive" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: subject,
        html: htmlTemplate,
        text: textContent,
    });
}

