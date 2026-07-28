import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-serif-display",
});

export const metadata: Metadata = {
  title: "Aarush Gupta — Full Stack & AI/ML Engineer",
  description:
    "Portfolio of Aarush Gupta, a Full Stack and AI/ML engineer building intelligent products end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font vars must live on <html>: @theme resolves var(--font-inter) at :root,
    // and a var() that is undefined there makes the whole token invalid.
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
