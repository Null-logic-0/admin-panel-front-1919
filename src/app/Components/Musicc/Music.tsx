'use client'
import { useState } from 'react';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Search from '../Search/Search';
import styles from './Music.module.scss'
import { musicTableInterface } from '@/app/interface/musicTable.interface';
import MusicTable from '../MusicTable/MusicTable';

const dataSource:musicTableInterface [] = [
    {
        id: 1,
        key: '1',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        view:'1',
        time:'12'
    },
    {
        id: 2,
        key: '2',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        view:'1',
        time:'12'
    },
    {
        id: 3,
        key: '3',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        view:'1',
        time:'12'
    },


];

const Music = () => {
    const [searchTerm, setSearchTerm] = useState('');
   

    return (
        <>
            <div className={styles.container}>
                <MultiTaskButton icon={'/Icons/AddSongs.svg'} title='Add Songs'  />
                <Search placeHolder='Search for Music' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <MusicTable dataSource={dataSource} />

           

        </>

    )
}

export default Music;