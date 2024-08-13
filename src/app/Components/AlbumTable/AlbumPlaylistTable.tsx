'use client'
import styles from './AlbumPlaylistTable.module.scss'
import React from 'react';
import { Table, Space,} from 'antd';
import AlbumPlaylistInfoCard from '../AlbumPlaylistInfoCard/AlbumPlaylistInfoCard';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import { albumPlaylistTableInterface } from '@/app/interface/albumPlaylistTable.interface';



type tableProps = {
    dataSource:albumPlaylistTableInterface[];
    title:string;
}

const AlbumPlaylistTable = ({dataSource,title}:tableProps) => {
    const columns = [
        {
            title: title,
            dataIndex: title,
            key: title,
            render: (text: string, record: albumPlaylistTableInterface) => (
                <AlbumPlaylistInfoCard
                    image={record.image}
                    playlistName={record.playlistName}
                    artistName={record.artistName} />

            ),
        },
       
        {
            title: 'Songs',
            dataIndex: 'songs',
            key: 'songs',
            render: (text:string, record: albumPlaylistTableInterface)=>(
                <span className={styles.text}>{record.songs}</span>
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
