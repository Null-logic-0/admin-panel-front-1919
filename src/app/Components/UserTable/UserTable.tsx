'use client';
import React from 'react';
import { Table, Space } from 'antd';
import styles from './UserTable.module.scss';
import { UserTableInterFace } from '@/app/interface/UserTable.interface';
import ArtistUserInfoCard from '../ArtistUserInfoCard/ArtistUserInfoCard';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';

const dataSource: UserTableInterFace[] = [
    {
        id: 1,
        key: '1',
        image: '/images/user1.png',
        name: 'User Name',
        status: 'Activity',
        email: 'UserGmail@gmail.com',
        number: '555 555 555',
        activity: '1h Ago',
    },
    {
        id: 2,
        key: '2',
        image: '/images/user2.png',
        name: 'User Name',
        status: 'Activity',
        email: 'UserGmail@gmail.com',
        number: '555 555 555',
        activity: '1h Ago',
    },
    {
        id: 2,
        key: '3',
        image: '/images/user3.png',
        name: 'User Name',
        status: 'Activity',
        email: 'UserGmail@gmail.com',
        number: '555 555 555',
        activity: '1h Ago',
    },

];

const columns = [
    {
        title: 'Name/Image',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: UserTableInterFace) => (
            <ArtistUserInfoCard image={record.image} userName={record.name} />
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render : (text:string, record:UserTableInterFace)=>(
            <span className={styles.text}>{record.status}</span>
        )
    },
    {
        title: 'Gmail',
        dataIndex: 'email',
        key: 'email',
        render : (text:string, record:UserTableInterFace)=>(
            <span className={styles.text}>{record.email}</span>
        )
    },
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
        render : (text:string, record:UserTableInterFace)=>(
            <span className={styles.text}>{record.number}</span>
        )
    },
    {
        title: 'Activity',
        dataIndex: 'activity',
        key: 'activity',
        render : (text:string, record:UserTableInterFace)=>(
            <span className={styles.text}>{record.activity}</span>
        )
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text: any, record: UserTableInterFace) => (
            <Space size='middle'>
                <MultiTaskButton icon={'/Icons/pen.svg'} />
                <MultiTaskButton icon={'/Icons/trash.svg'} />
            </Space>
        ),
    },
];

const UserTable = () => {
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowKey="key"
            className={styles.tableContainer} />
    );
};

export default UserTable;
