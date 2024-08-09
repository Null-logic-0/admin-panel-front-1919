'use client'
import React, { useState } from 'react';
import NavItem from './NavItem/NavItem';
import style from './NavMenu.module.scss';

const NavMenu = () => {
    const links = [
        { key: 'home', href: "/", text: "Artist", iconSrc: '/icons/favourite.svg' },
        { key: 'user', href: "/user", text: "User", iconSrc: '/icons/user.svg' },
        { key: 'Playlist', href: "/playlist", text: "Playlist", iconSrc: '/icons/playlists.svg' },
        { key: 'album', href: "/album", text: "Album", iconSrc: '/icons/albums.svg' },
        { key: 'music', href: "/music", text: "Music", iconSrc: '/icons/musics.svg' },
    ];


    return (
        <div className={style.main}>
            <h1 className={style.logo}>TnNdshN</h1>

            <div className={style.container}>
                <NavItem links={links} />

            </div>
        </div>
    );
};

export default NavMenu;
