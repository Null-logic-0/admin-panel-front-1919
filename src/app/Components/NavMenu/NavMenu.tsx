'use client'
import React, { useState } from 'react';
import style from './NavMenu.module.scss';
import NavItem from './Navigation/Navigation';
import Navigation from './Navigation/Navigation';

const NavMenu = () => {
    const linksData = [
        { key: 'home', href: "/", title: "Artist", iconSrc: '/icons/favourite.svg' },
        { key: 'user', href: "/user", title: "User", iconSrc: '/icons/user.svg' },
        { key: 'Playlist', href: "/playlist", title: "Playlist", iconSrc: '/icons/playlists.svg' },
        { key: 'album', href: "/album", title: "Album", iconSrc: '/icons/albums.svg' },
        { key: 'music', href: "/music", title: "Music", iconSrc: '/icons/musics.svg' },
    ];


    return (
        <div className={style.main}>
            <h1 className={style.logo}>TnNdshN</h1>

            <div className={style.container}>
                <Navigation links={linksData} />
            </div>
        </div>
    );
};

export default NavMenu;
