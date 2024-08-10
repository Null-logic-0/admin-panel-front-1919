'use client'
import styles from './AlbumPlaylistTable.module.scss'
import React from 'react';
import { Table, Space, Button, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { albumPlaylistTableInterface } from '@/app/interface/albumPlaylistTable.interface';
import AlbumPlaylistInfoCard from '../AlbumPlaylistInfoCard/AlbumPlaylistInfoCard';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';



type tableProps = {
    dataSource:albumPlaylistTableInterface[];
}

const AlbumPlaylistTable = ({dataSource}:tableProps) => {
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
            dataSource={dataSource}
            pagination={false}
            rowKey="key"
            bordered
            className={styles.tableContainer}
        />
    );
};

export default AlbumPlaylistTable;
