'use client'
import { useState } from 'react';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Search from '../Search/Search';
import styles from './Music.module.scss'
import { musicTableInterface } from '@/app/interface/musicTable.interface';
import MusicTable from '../MusicTable/MusicTable';
import Modal from '../Modal/Modal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import MusicForm from '../FormForModal/MusicModal/MusicForm';

const dataSource: musicTableInterface[] = [
    {
        id: 1,
        key: '1',
        image: '/Images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        view: '1',
        time: '12'
    },
    {
        id: 2,
        key: '2',
        image: '/Images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        view: '1',
        time: '12'
    },
    {
        id: 3,
        key: '3',
        image: '/Images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        view: '1',
        time: '12'
    },


];

const Music = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddMusicModal, setShowAddMusicModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);

    const handleShow = () => {
        setShowDeleteModal(!showDeleteModal)
    }

    const handleClose = () => {
        setShowDeleteModal(false)
    }

    const addMusicModal = () => {
        setShowAddMusicModal(!showAddMusicModal);

    }

    const openEditModal = () => {
        setshowEditModal(!showEditModal)
    }

    return (
        <>
            <div className={styles.container}>
                <MultiTaskButton icon={'/Icons/addSongs.svg'} title='Add Songs' onclick={addMusicModal} />
                <Search placeHolder='Search for Music' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <MusicTable dataSource={dataSource} remove={handleShow} edit={openEditModal}/>

            {
                showDeleteModal && (
                    <Modal setShowModal={handleShow}>
                        <ConfirmModal text={'Do you want to delte Music?'} onclose={handleClose} />
                    </Modal>
                )
            }

            {
                showAddMusicModal &&
                (
                    <Modal setShowModal={addMusicModal}>
                        <MusicForm setShowModal={addMusicModal} />

                    </Modal>
                )
            }

            {
                showEditModal && (
                    <Modal setShowModal={openEditModal}>
                        <MusicForm setShowModal={openEditModal} />

                    </Modal>
                )
            }

        </>

    )
}

export default Music;