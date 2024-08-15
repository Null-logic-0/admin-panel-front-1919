'use client';
import React from 'react';
import { Table, Space } from 'antd';
import styles from './ArtistTable.module.scss';
import ArtistUserInfoCard from '../ArtistUserInfoCard/ArtistUserInfoCard';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import { ArtistTableInterFace } from '@/app/interface/artistTable.interface';

type tableProps ={
    remove?:()=>void;
    edit?:()=>void;
    dataSource: ArtistTableInterFace[];
    
};

const ArtistTable = ({edit, remove,dataSource}:tableProps) => {
    const columns = [
        {
            title: 'Name/Image',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: ArtistTableInterFace) => (
                <ArtistUserInfoCard image={record.image} firstName={record.firstName} lastName={record.lastName}  />
            ),
        },
        {
            title: 'Album',
            dataIndex: 'album',
            key: 'album',
            render : (text:string, record:ArtistTableInterFace)=>(
                <span className={styles.text}>{record.albums}</span>
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