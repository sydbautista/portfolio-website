import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syd Bautista — Full-Stack Web Developer & Systems Analyst",
  description: "Full-stack web developer and systems analyst building polished interfaces, reliable backends, and connected infrastructure.",
  icons: { icon: "/favicon.svg?v=sb", shortcut: "/favicon.svg?v=sb" },
  openGraph: {
    title: "Syd Bautista — Full-Stack Web Developer & Systems Analyst",
    description: "I engineer the way ideas feel.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Syd Bautista portfolio" }],
  },
  twitter: { card: "summary_large_image", title: "Syd Bautista — Full-Stack Web Developer & Systems Analyst", description: "I engineer the way ideas feel.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
