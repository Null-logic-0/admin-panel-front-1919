'use client'
import styles from './MusicTable.module.scss'
import React from 'react';
import { Table, Space,} from 'antd';
import AlbumPlaylistInfoCard from '../AlbumPlaylistInfoCard/AlbumPlaylistInfoCard';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import { musicTableInterface } from '@/app/interface/musicTable.interface';



type tableProps = {
    dataSource:musicTableInterface[];
    edit?:()=>void;
    remove?:()=>void;
}

const MusicTable = ({dataSource,edit,remove}:tableProps) => {
    const columns = [
        {
            title: 'Music Name',
            dataIndex: 'MusicName',
            key: 'MusicName',
            render: (text: string, record: musicTableInterface) => (
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
            render: (text:string, record: musicTableInterface)=>(
                <span className={styles.text}>{record.view}</span>
            )
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (text:string, record: musicTableInterface)=>(
                <span className={styles.text}>{record.time}</span>
            )
        },
    
        {
            
            render: (text: string, record: musicTableInterface) => (
                <Space size="middle">
                    <MultiTaskButton icon={'/Icons/pen.svg'} onclick={edit}/>
                    <MultiTaskButton icon={'/Icons/trash.svg'} onclick={remove}/>
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

export default MusicTable;
