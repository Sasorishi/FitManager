import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Typage des variables de police
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Typage de metadata
export const metadata = {
  title: "FitManager",
  description: "platform for coach trainers",
};

interface RootLayoutProps {
  children: React.ReactNode; // Typage de `children` pour accepter tout type de contenu React
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
