import { Inter } from "next/font/google";
import Providers from "../../store/Providers"; // ✅ Import the new Providers component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "AI Chatbot",
    description: "A chatbot built with Next.js and OpenAI",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers> {/* ✅ Use the Providers component here */}
            </body>
        </html>
    );
}
