"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./LinkItem.module.scss";

interface LinkItemProps {
  href: string;
  name: string;
  active: boolean;
}

const LinkItem = ({ href, name, active }: LinkItemProps) => {
  const currentPath = usePathname();
  let classModifier = undefined;

  if (active) {
    classModifier = currentPath === href ? styles.active : undefined;
  }
  return (
    <Link href={href} className={classModifier}>
      {name}
    </Link>
  );
};

export default LinkItem;
