import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syd Bautista — UI Systems Engineer",
  description: "Front-end specialist engineering scalable systems, intuitive products, and intelligent digital experiences.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Syd Bautista — UI Systems Engineer",
    description: "I engineer the way ideas feel.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Syd Bautista portfolio" }],
  },
  twitter: { card: "summary_large_image", title: "Syd Bautista — UI Systems Engineer", description: "I engineer the way ideas feel.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
