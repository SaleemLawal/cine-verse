"use client";
import React from "react";
import MovieBackdrop from "@/components/HomePageBackdrop/MovieBackdrop";
import { usePathname } from "next/navigation";
import styles from "./Backdrop.module.scss";

const Backdrop = () => {
  const pathName = usePathname();

  if (pathName === "/") {
    return <MovieBackdrop />;
  } else if (pathName === "/movies" || pathName === "/series") {
    return (
      <div className={styles.bg}>
        <h2>{pathName === "/movies" ? "Movies" : "Series"}</h2>
      </div>
    );
  }
};

export default Backdrop;
