import type { Metadata } from "next";

// Global styles:
import "@/styles/globals.css";
import "@typethings/ui/dist/index.css";
import { cn } from "@typethings/ui";

// Layout:
import Navbar from "@/components/navbar";

// Providers:
import { ThemeProvider } from "@/providers/theme-provider";

// Metadata:
export const metadata: Metadata = {
  title: {
    default: "Typethings - A beautiful note taking app.",
    template: "%s | Typethings",
  },
  description: "A simple, beautiful and powerful markdown editor",
  icons: ["/images/logo.svg"],
  openGraph: {
    title: "Typethings",
    description: "A beautiful note taking app.",
    url: "https://typethings.app",
    siteName: "Typethings",
    locale: "en_US",
    // images: [
    //   {
    //     url: "https://typethings.app/images/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Typethings",
    //   },
    // ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Typethings",
    card: "summary_large_image",
  },
};

// Main app:
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-neutral-100 text-neutral-900 dark:text-white antialiased dark:bg-neutral-900",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
