import type { Metadata } from "next";
import "./globals.scss";
// import styles from "./layout.module.scss";
import Header from "@/component/header/Header";
import MovieBackdrop from "@/component/HomePageBackdrop/MovieBackdrop";

export const metadata: Metadata = {
  title: "Cine Verse",
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
        <MovieBackdrop />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
