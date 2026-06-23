import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollVideo from "@/components/ScrollVideo";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Veldara — Instantly craft immersive 3D worlds",
  description: "Veldara merges the elegance of Svelte 5 with the depth of Three.js within easy reach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} style={{ background: "#010101", color: "#fff" }}>
        <ScrollVideo />
        <ParticlesCanvas />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
