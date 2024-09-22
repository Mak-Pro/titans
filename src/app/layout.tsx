import "@/assets/styles/globals.scss";
import type { Viewport } from "next";
import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Chakra_Petch, Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const chakra_petch = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra-petch",
});

export const metadata: Metadata = {
  title: "OPO Telegram Template",
  description: "OPO Telegram Template Starter",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.variable} ${chakra_petch.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
