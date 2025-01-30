import React from "react";
import styles from "./Footer.module.scss";
import Logo from "../logo/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <Logo />
      <div className={styles["footer__grid-links"]}>
        <Link href="/" className={styles["footer__grid-link"]}>
          Home
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          Live
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          You Must Watch
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          Contact Us
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          FAQ
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          Recent Release
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          Term Of Services
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          Premium
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          Top IMDB
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          About Us
        </Link>
        <Link href="/" className={styles["footer__grid-link"]}>
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
