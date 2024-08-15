'use client'
import { useState } from 'react';
import ArtistTable from '../ArtistTable/ArtistTable';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Search from '../Search/Search';
import styles from './Playlist.module.scss'
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import AlbumPlaylistTable from '../AlbumTable/AlbumPlaylistTable';
import { albumPlaylistTableInterface } from '@/app/interface/albumPlaylistTable.interface';

const dataSource:albumPlaylistTableInterface [] = [
    {
        id: 1,
        key: '1',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 2,
        key: '2',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 3,
        key: '3',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 4,
        key: '4',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 5,
        key: '5',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 6,
        key: '6',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 7,
        key: '7',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },


];

const Artist = () => {
    const [searchTerm, setSearchTerm] = useState('');
   

    return (
        <>
            <div className={styles.container}>
                <MultiTaskButton icon={'/Icons/Playlist.svg'} title='Add Playlist'  />
                <Search placeHolder='Search for Playlist' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <AlbumPlaylistTable dataSource={dataSource} title={'PLaylist Name'} />

           

        </>

    )
}

export default Artist;