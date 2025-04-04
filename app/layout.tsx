import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/globalComponents/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  display: "swap",
});

export const metadata: Metadata = {
  title: "HackScraper - The Ultimate Hackathon Radar",
  description: "Find the perfect hackathon for you with HackScraper, the ultimate hackathon finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
     
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={` ${poppins.variable} font-orbitron min-h-screen antialiased bg-black`}
        >
                {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
