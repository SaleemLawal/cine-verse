"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./LinkItem.module.scss";

interface LinkItemProps {
  href: string;
  name: string;
}

const LinkItem = ({ href, name }: LinkItemProps) => {
  const currentPath = usePathname();
  return (
    <Link
      href={href}
      className={currentPath === href ? styles.active : undefined}
    >
      {name}
    </Link>
  );
};

export default LinkItem;
