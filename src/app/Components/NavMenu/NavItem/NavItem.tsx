import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./NavItem.module.scss";
import { NavLinkInterface } from "@/app/interface/NavLink.interface";


type NavListProps = {
  links: NavLinkInterface[];
};

const NavItem = ({ links }: NavListProps) => {
  const pathname = usePathname();

  return (
    <ul className={styles.navList}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.key} className={styles.navItem}>
            <Link href={link.href} passHref
              className={`${styles.navLink} ${isActive ? styles.active : ""}`}>
              <Image
                src={link.iconSrc}
                alt={link.text || "Link icon"}
                width={32}
                height={32}
                className={styles.navIcon}
              />
              {link.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItem;
