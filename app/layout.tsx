import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const OutfitFont = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Content Generator",
  description: "Next.js App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={OutfitFont.className}
        >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
