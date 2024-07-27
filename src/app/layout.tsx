import type { Metadata, Viewport } from "next";
import "./globals.css";

import { fonts } from "./fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Tempestra",
  description: "Weather and air quality forecast",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#80F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.lato.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
