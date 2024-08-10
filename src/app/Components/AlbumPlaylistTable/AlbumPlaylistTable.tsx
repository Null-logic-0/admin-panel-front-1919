'use client'
import styles from './AlbumPlaylistTable.module.scss'
import React from 'react';
import { Table, Space, Button, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { albumPlaylistTableInterface } from '@/app/interface/albumPlaylistTable.interface';
import AlbumPlaylistInfoCard from '../AlbumPlaylistInfoCard/AlbumPlaylistInfoCard';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';


const data: albumPlaylistTableInterface[] = [
    {
        id: 1,
        key: '1',
        image: '/images/CardIMG.png',
        playlistName: 'Playlist Name',
        artistName: 'Artist Name',
        view: '111,444',
        time: '54:18',
        like: '17,951',
    },
    {
        id: 2,
        key: '2',
        image: '/images/CardIMG.png',
        playlistName: 'Playlist Name',
        artistName: 'Artist Name',
        view: '111,444',
        time: '54:18',
        like: '17,951',
    },
    {
        id: 3,
        key: '3',
        image: '/images/CardIMG.png',
        playlistName: 'Playlist Name',
        artistName: 'Artist Name',
        view: '111,444',
        time: '54:18',
        like: '17,951',
    },
];


const AlbumPlaylistTable = () => {
    const columns = [
        {
            title: 'Playlist Name',
            dataIndex: 'playlistName',
            key: 'playlistName',
            render: (text: string, record: albumPlaylistTableInterface) => (
                <AlbumPlaylistInfoCard
                    image={record.image}
                    playlistName={record.playlistName}
                    artistName={record.artistName} />

            ),
        },
        {
            title: 'View',
            dataIndex: 'view',
            key: 'view',
            render: (text:string, record: albumPlaylistTableInterface)=>(
                <span className={styles.text}>{record.view}</span>
            )
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (text:string, record: albumPlaylistTableInterface)=>(
                <span className={styles.text}>{record.time}</span>
            )
        },
        {
            title: 'Like',
            dataIndex: 'like',
            key: 'like',
            render: (text:string, record: albumPlaylistTableInterface)=>(
                <span className={styles.text}>{record.like}</span>
            )
        },
        {
            
            render: (text: string, record: albumPlaylistTableInterface) => (
                <Space size="middle">
                    <MultiTaskButton icon={'/Icons/trash.svg'} />
                    <MultiTaskButton icon={'/Icons/pen.svg'} />
                </Space>
            ),
        },
    ];


    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="key"
            bordered
            className={styles.tableContainer}
        />
    );
};

export default AlbumPlaylistTable;
