import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Influencer Equity Agreement Platform",
  description:
    "Create, manage, and track conditional vested equity agreements with influencers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
