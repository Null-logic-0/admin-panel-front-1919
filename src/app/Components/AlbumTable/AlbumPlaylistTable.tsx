'use client'
import styles from './AlbumPlaylistTable.module.scss'
import React, { useState } from 'react';
import { Table, Space} from 'antd';
import AlbumPlaylistInfoCard from '../AlbumPlaylistInfoCard/AlbumPlaylistInfoCard';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import { albumPlaylistTableInterface } from '@/app/interface/albumPlaylistTable.interface';
import { dropDownOptions } from '@/app/interface/dropdown.interface';
import Dropdown from '../Dropdown/Dropdown';



type tableProps = {
    dataSource: albumPlaylistTableInterface[];
    title: string;
    remove?: () => void;
    dropdownOptions: dropDownOptions[];

}

const AlbumPlaylistTable = ({ dataSource, title,dropdownOptions,remove }: tableProps) => {
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
            render: (text: string, record: albumPlaylistTableInterface) => (
                <span className={styles.text}>{record.songs}</span>
            )
        },

        {

            render: (text: string, record: albumPlaylistTableInterface) => (
                <Space size="middle">
                    <div className={styles.dropdownContainer}>
                        <div className={styles.button}>
                            <MultiTaskButton
                                icon={'/Icons/pen.svg'}
                                onclick={() => toggleDropdown(record.id.toString())}
                            />
                        </div>

                        {dropdownVisibility[record.id.toString()] && (
                            <div className={styles.dropdown}>
                                <Dropdown options={dropdownOptions} onOptionSelect={() => closeDropdown(record.id.toString())} />
                            </div>
                        )}
                    </div>
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

export default AlbumPlaylistTable;
