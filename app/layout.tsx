import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/header/Header";
import { MoviesProvider } from "@/context/MoviesContext";
import Footer from "@/components/footer/Footer";
import Backdrop from "@/components/backdrop/Backdrop";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "CineVerse",
  description: "Cine Verse is a movie review website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MoviesProvider>
          <Backdrop />
          <Header />
          <div>{children}</div>
        </MoviesProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
