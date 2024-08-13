'use client';
import React from 'react';
import { Table, Space } from 'antd';
import styles from './UserTable.module.scss';
import { UserTableInterFace } from '@/app/interface/UserTable.interface';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';

const dataSource: UserTableInterFace[] = [
    {
        id: 1,
        key: '1',
        email: 'UserGmail@gmail.com',
    },
    {
        id: 2,
        key: '2',
        email: 'UserGmail@gmail.com',
    },
    {
        id: 2,
        key: '3',
        email: 'UserGmail@gmail.com',
    },

];

const columns = [
    {
        title: 'Gmail',
        dataIndex: 'email',
        key: 'email',
        render : (text:string, record:UserTableInterFace)=>(
            <span className={styles.text}>{record.email}</span>
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
