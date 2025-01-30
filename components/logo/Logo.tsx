import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/tmovie.svg";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <Image src={logo} alt="CineVerse" width={25} height={25} />
      <span>CineVerse</span>
    </Link>
  );
};

export default Logo;
