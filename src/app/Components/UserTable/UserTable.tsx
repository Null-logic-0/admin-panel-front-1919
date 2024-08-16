'use client';
import React, { useState } from 'react';
import { Table, Space } from 'antd';
import styles from './UserTable.module.scss';
import { UserTableInterFace } from '@/app/interface/UserTable.interface';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Dropdown from '../Dropdown/Dropdown';
import { dropDownOptions } from '@/app/interface/dropdown.interface';



type userTableProps = {
    dataSource: UserTableInterFace[];
    remove?: () => void;
    dropdownOptions: dropDownOptions[];
};

const UserTable = ({ dataSource, remove,dropdownOptions}: userTableProps) => {
    const [dropdownVisibility, setDropdownVisibility] = useState<{ [key: string]: boolean }>({});

    const toggleDropdown = (id: string) => {
        setDropdownVisibility(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const closeDropdown = (id: string) => {
        setDropdownVisibility(prevState => ({
            ...prevState,
            [id]: false,
        }));
    };

    const columns = [
        {
            title: 'Gmail',
            dataIndex: 'email',
            key: 'email',
            render: (text: string, record: UserTableInterFace) => (
                <span className={styles.text}>{record.email}</span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: UserTableInterFace) => (
                <Space size='middle'>
                    <div className={styles.dropdownContainer}>
                        <div className={styles.button}>
                            <MultiTaskButton 
                                icon={'/Icons/pen.svg'} 
                                onclick={() => toggleDropdown(record.id.toString())} 
                            />
                        </div>

                        {dropdownVisibility[record.id.toString()] && (
                            <div className={styles.dropdown}>
                                <Dropdown options={dropdownOptions}  onOptionSelect={() => closeDropdown(record.id.toString())}/>
                            </div>
                        )}
                    </div>

                    <MultiTaskButton 
                        icon={'/Icons/trash.svg'} 
                        onclick={remove} 
                    />
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowKey="id" 
            className={styles.tableContainer}
        />
    );
};

export default UserTable;
