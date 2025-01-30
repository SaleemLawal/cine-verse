"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Header.module.scss";
import LinkItem from "../Link/LinkItem";
import Logo from "../logo/Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current && wrapperRef.current) {
        wrapperRef.current.style.height = `${headerRef.current.offsetHeight}px`;
      }
    };
    updateHeight();

    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("resize", updateHeight);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <header
      ref={wrapperRef}
      className={`${styles["header-wrapper"]} ${isScrolled ? styles.blur : ""}`}
    >
      <div ref={headerRef} className={`${styles.header}`}>
        <Logo />
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
      </div>
    </header>
  );
};

export default Header;
