import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NG.LEARN - Study Should Be Fun! 🎉",
  description:
    "Les privat terbaik untuk anak SD hingga SMA. Belajar jadi menyenangkan bersama tutor berpengalaman NG.LEARN!",
  keywords: "les privat, bimbingan belajar, tutor, sd smp sma, nglearn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-theme="nglearn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
