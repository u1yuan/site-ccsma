import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import type { ReactNode } from "react";

import { ExperienceProvider } from "@/src/components/shell/ExperienceProvider";
import { SiteFooter } from "@/src/components/shell/SiteFooter";
import { SiteHeader } from "@/src/components/shell/SiteHeader";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "CCSMA — Bio-digital campus concept",
    template: "%s | CCSMA",
  },
  description:
    "An unofficial scrollytelling concept for FEU Tech's College of Computer Studies and Multimedia Arts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="bg-night-950">
      <body
        className={`${poppins.variable} ${inter.variable} ${jetBrainsMono.variable} bg-night-950 font-body text-ink-100 antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <ExperienceProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ExperienceProvider>
      </body>
    </html>
  );
}
