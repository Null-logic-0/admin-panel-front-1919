'use client';
import React from 'react';
import { Table, Space } from 'antd';
import styles from './ArtistTable.module.scss';
import ArtistUserInfoCard from '../ArtistUserInfoCard/ArtistUserInfoCard';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import { ArtistTableInterFace } from '@/app/interface/artistTable.interface';




const dataSource: ArtistTableInterFace[] = [
    {
        id: 1,
        key: '1',
        image: '/images/user1.png',
        name: 'User Name',
        albumName:'album name',
        musics: '77',
    },
    {
        id: 2,
        key: '2',
        image: '/images/user2.png',
        name: 'User Name',
        albumName:'album name',
        musics: '77',
    },
    {
        id: 3,
        key: '3',
        image: '/images/user3.png',
        name: 'User Name',
        albumName:'album name',
        musics: '77',
    },
    {
        id: 4,
        key: '4',
        image: '/images/user2.png',
        name: 'User Name',
        albumName:'album name',
        musics: '77',
    },
    {
        id: 5,
        key: '5',
        image: '/images/user3.png',
        name: 'User Name',
        albumName:'album name',
        musics: '77',
    },
    {
        id: 6,
        key: '6',
        image: '/images/user2.png',
        name: 'User Name',
        albumName:'album name',
        musics: '77',
    },
    {
        id: 7,
        key: '7',
        image: '/images/user3.png',
        name: 'User Name',
        albumName:'album name',
        musics: '77',
    },
   

];

type tableProps ={
    remove?:()=>void
    edit?:()=>void
}


const ArtistTable = ({edit, remove}:tableProps) => {
    const columns = [
        {
            title: 'Name/Image',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: ArtistTableInterFace) => (
                <ArtistUserInfoCard image={record.image} userName={record.name} />
            ),
        },
        {
            title: 'Album',
            dataIndex: 'album',
            key: 'album',
            render : (text:string, record:ArtistTableInterFace)=>(
                <span className={styles.text}>{record.albumName}</span>
            )
        },
        {
            title: 'Musics',
            dataIndex: 'musics',
            key: 'musics',
            render : (text:string, record:ArtistTableInterFace)=>(
                <span className={styles.text}>{record.musics}</span>
            )
        },
        
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: ArtistTableInterFace) => (
                <Space size='middle'>
                    <MultiTaskButton icon={'/Icons/pen.svg'} onclick={edit}/>
                    <MultiTaskButton icon={'/Icons/trash.svg'} onclick={remove}/>
                </Space>
            ),
        },
    ];
    
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowKey="key"
            className={styles.tableContainer} />
    );
};

export default ArtistTable;