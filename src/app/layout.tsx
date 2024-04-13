import SiteFooter from "@/components/layout/site-footer";
import SiteNav from "@/components/layout/site-navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brainchain Games",
  description: "Earn an NFT by engaging in interactive and educational games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${sans.className} flex min-h-screen flex-col bg-background antialiased`,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <SiteNav />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
