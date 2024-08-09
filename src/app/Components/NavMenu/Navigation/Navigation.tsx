import React from "react";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.scss";
import { NavLinkInterface } from "@/app/interface/NavLink.interface";
import NavItem from "../NavItem/NavItem";


type NavListProps = {
  links: NavLinkInterface[];
};
const Navigation = ({ links }: NavListProps) => {
  const pathname = usePathname();

  return (
    <ul className={styles.navList}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <NavItem  
            key={link.key}
            link={link.href}
            iconSrc={link.iconSrc} 
            text={link.title}
            classname={`${isActive ? styles.active : ""}`}
          />
        );
      })}
    </ul>
  );
};

export default Navigation;
