
# Karbhawan - Premium Auto Accessories E-Commerce

Welcome to **Karbhawan**, a high-end e-commerce platform dedicated to providing premium auto accessories. This application features a modern, responsive user interface with robust functionality for browsing products, managing orders, and ensuring secure payments.

## 🚀 Tech Stack

This project is built using the latest web technologies to ensure performance, scalability, and developer experience.

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) - The React Framework for the Web.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for safer code.
*   **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose ODM) - Flexible document database.
*   **Authenticaton**: [NextAuth.js v5](https://authjs.dev/) - Secure authentication (Google OAuth & Credentials/OTP).
*   **Styling**: 
    *   [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework.
    *   [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library.
    *   [Lenis](https://github.com/darkroomengineering/lenis) - Smooth scrolling.
*   **Payments**: [Razorpay](https://razorpay.com/) - Secure payment gateway integration.
*   **Media**: [Cloudinary](https://cloudinary.com/) - Image and video management.
*   **Emails**: [Nodemailer](https://nodemailer.com/) - Sending transactional emails.
*   **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation.

## ✨ Key Features

### 🛍️ User Experience
*   **Premium UI/UX**: Glassmorphism design, smooth scroll, and interactive animations.
*   **Product Catalog**: Advanced search, filtering by category, and detailed product pages.
*   **Smart Cart**: Dynamic cart management with stock validation.
*   **Checkout**: Integrated Razorpay payment flow with address management.
*   **User Accounts**: Order history, profile management, and saved addresses.
*   **Installation Services**:
    *   Location-based service availability (Delhi NCR).
    *   Dynamic installation cost calculation based on product and vehicle type.

### 🛡️ Admin Dashboard
*   **Product Management**: Create, edit, and delete products with image uploads.
*   **Order Management**: View and update order statuses (Processing, Shipped, Delivered, Installed).
*   **Installation Management**: Manage installation rates and segments.
*   **Analytics**: Overview of sales and order metrics.

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/karbhawan.git
    cd karbhawan
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory. You can use the provided example as a template:
    ```bash
    cp .env.example .env
    ```
    Fill in your API keys and secrets (MongoDB, Google Auth, Razorpay, Cloudinary, SMTP).

4.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📜 Scripts

*   `npm run dev`: Starts the development server with TurboPack.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Runs ESLint for code quality.

## 📂 Project Structure

*   `/app`: Next.js App Router pages and API routes.
*   `/components`: Reusable UI components (buttons, inputs, layout).
*   `/lib`: Utility functions, database connection, email logic.
*   `/models`: Mongoose database schemas (User, Product, Order).
*   `/types`: TypeScript type definitions.
*   `/public`: Static assets.

---

Built with ❤️ by the Karbhawan Team.
