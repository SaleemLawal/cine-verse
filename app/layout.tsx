import type { Metadata } from "next";
import "./globals.scss";
// import styles from "./layout.module.scss";
import Header from "@/component/header/Header";
import MovieBackdrop from "@/component/HomePageBackdrop/MovieBackdrop";
import { MoviesProvider } from "@/context/MoviesContext";

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
        <MoviesProvider>
          <MovieBackdrop />
          <Header />
          <div>{children}</div>
        </MoviesProvider>
      </body>
    </html>
  );
}
