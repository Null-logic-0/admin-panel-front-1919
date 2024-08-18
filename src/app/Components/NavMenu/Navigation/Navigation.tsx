'use client'
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.scss";
import NavItem from "../NavItem/NavItem";
import Image from "next/image";


const linksData = [
  { key: 'home', href: "/", title: "Artist", iconSrc: '/icons/favourite.svg' },
  { key: 'user', href: "/users", title: "User", iconSrc: '/icons/user.svg' },
  { key: 'Playlist', href: "/playlists", title: "Playlist", iconSrc: '/icons/playlists.svg' },
  { key: 'album', href: "/albums", title: "Album", iconSrc: '/icons/albums.svg' },
  { key: 'music', href: "/musics", title: "Music", iconSrc: '/icons/musics.svg' },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className={styles.main}>
      <Image src={'/Icons/Logo.svg'} alt="logo" width={70} height={75}/>
      <div className={styles.container}>

        <ul className={styles.navList}>
          {linksData.map((link) => {
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

      </div>
    </div>

  );
};

export default Navigation;
