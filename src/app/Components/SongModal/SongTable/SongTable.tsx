'use client'
import React, { useState } from 'react';
import { Table } from 'antd';
import MultiTaskButton from '../../MultiTaskButton/MultiTaskButton';
import AlbumPlaylistInfoCard from '../../AlbumPlaylistInfoCard/AlbumPlaylistInfoCard';
import styles from './SongTable.module.scss';
import { songModalInterface } from '@/app/interface/songModal.interface';
import Modal from '../../Modal/Modal';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';

const data: songModalInterface[] = [
    {
        id: 1,
        key: '1',
        image: '/Images/song.png',
        songName: 'Song Name',
        artistName: 'Artist Name',
        duration: '4.15',
    },
    {
        id: 2,
        key: '2',
        image: '/Images/song.png',
        songName: 'Song Name',
        artistName: 'Artist Name',
        duration: '4.15',
    },
    {
        id: 3,
        key: '3',
        image: '/Images/song.png',
        songName: 'Song Name',
        artistName: 'Artist Name',
        duration: '4.15',
    },
    {
        id: 4,
        key: '2',
        image: '/Images/song.png',
        songName: 'Song Name',
        artistName: 'Artist Name',
        duration: '4.15',
    },
    {
        id: 5,
        key: '3',
        image: '/Images/song.png',
        songName: 'Song Name',
        artistName: 'Artist Name',
        duration: '4.15',
    },
];



const SongTable = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShow = () => {
        setShowDeleteModal(!showDeleteModal)
    }

    const handleClose = () => {
        setShowDeleteModal(false)
    }

    const columns = [
        {
            title: 'Song Name',
            dataIndex: 'songName',
            key: 'songName',
            render: (text: string, record: songModalInterface) => (
                <AlbumPlaylistInfoCard
                    image={record.image}
                    playlistName={record.songName}
                    artistName={record.artistName}
                />
            ),
        },
        {
            title: '',
            dataIndex: 'duration',
            key: 'duration',
            render: (text: string, record: songModalInterface) => (
                <span className={styles.duration}>{record.duration}</span>
            ),
        },
        {
            title: '',
            key: 'action',
            dataIndex: 'action',
            align: 'center' as 'center',
            render: () => (
                <>
                    <MultiTaskButton icon={"/Icons/trash.svg"} onclick={handleShow} />
                    {
                        showDeleteModal && (
                            <Modal setShowModal={handleShow}>
                                <ConfirmModal text={'Do you want to delte Album?'} onclose={handleClose} />
                            </Modal>
                        )
                    }
                </>

            ),
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            showHeader={false}
            rowClassName={() => 'song-row'}
            className={styles.tableContainer}
        />
    );
};

export default SongTable;
