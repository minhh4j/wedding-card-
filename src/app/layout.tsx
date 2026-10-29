import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Lora, Playfair_Display } from "next/font/google";
import "./globals.css";

const script = Great_Vibes({ variable: "--font-script", subsets: ["latin"], weight: "400" });
const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const body = Lora({ variable: "--font-body", subsets: ["latin"], style: ["normal", "italic"] });
// high-contrast display serif with tall, even numerals (used for the big date)
const display = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["500", "700"], style: ["normal", "italic"] });

const title = "Gokul & Ardra | Rahul & Jisna";
const description =
  "You're invited to the weddings of Gokul & Ardra and Rahul & Jisna on 8 & 9 January 2027. Reception on 9 January at Olive Convention Centre, Kadappadi.";

// The share image comes from src/app/opengraph-image.jpeg (Next.js adds the og:image tags itself).
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Wedding Invitation",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${script.variable} ${serif.variable} ${body.variable} ${display.variable}`}>
      {/* browser extensions like Grammarly add attributes to <body>; ignore those mismatches */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
