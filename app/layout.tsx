import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Orbitron, Space_Grotesk } from "next/font/google";
import { CursorGlow } from "@/components/CursorGlow";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-orbitron", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Brogan King // Projects",
  description: "Game dev, engine builder and musician. Speed Golf Royale, Mainframe Engine, Dolphin Drive and Demoify.",
};

export const viewport: Viewport = { themeColor: "#05050c" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${orbitron.variable} ${grotesk.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh antialiased">
        <div className="bg-grid" aria-hidden="true" />
        <CursorGlow />
        {children}
        <div className="scanlines" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  );
}
