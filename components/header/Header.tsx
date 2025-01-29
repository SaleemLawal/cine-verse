import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/tmovie.svg";
import styles from "./Header.module.scss";
import LinkItem from "../Link/LinkItem";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <Image src={logo} alt="CineVerse" width={25} height={25} />
          <span>CineVerse</span>
        </Link>
        <ul>
          <li>
            <LinkItem href="/" name="Home" active={true} />
          </li>
          <li>
            <LinkItem href="/movies" name="Movies" active={true} />
          </li>
          <li>
            <LinkItem href="/series" name="Series" active={true} />
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
