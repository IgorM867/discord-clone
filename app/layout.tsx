import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

const ginto = localFont({
  src: [
    {
      path: "../public/fonts/ABCGintoNormalVariable.woff2",
    },
  ],
});

export const metadata: Metadata = {
  title: "Discord Clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${ginto.className} bg-d-gray-450`}>{children}</body>
    </html>
  );
}
