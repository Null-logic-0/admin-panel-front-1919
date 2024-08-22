'use client'
import { useState } from 'react';
import ArtistTable from '../ArtistTable/ArtistTable';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Search from '../Search/Search';
import styles from './Artist.module.scss'
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Modal from '../Modal/Modal';
import ArtistForm from '../FormForModal/ArtistForm';
import { ArtistTableInterFace } from '@/app/interface/artistTable.interface';

const dataSource: ArtistTableInterFace[] = [
    {
        id: 1,
        key: '1',
        image: '/Images/user1.png',
        musics: '77',
        firstName: 'Name',
        lastName: "lastName",
        albums: '34'
    },
    {
        id: 2,
        key: '2',
        image: '/Images/user2.png',
        firstName: 'Name',
        lastName: "lastName",
        albums: '4',
        musics: '77',
    },
    {
        id: 3,
        key: '3',
        image: '/Images/user3.png',
        firstName: 'Name',
        lastName: "lastName",
        albums: '2',
        musics: '77',
    },
    {
        id: 4,
        key: '4',
        image: '/Images/user2.png',
        firstName: 'Name',
        lastName: "lastName",
        albums: '14',
        musics: '77',
    },
    {
        id: 5,
        key: '5',
        image: '/Images/user3.png',
        firstName: 'Name',
        lastName: "lastName",
        albums: '4',
        musics: '77',
    },
    {
        id: 6,
        key: '6',
        image: '/Images/user2.png',
        firstName: 'Name',
        lastName: "lastName",
        albums: '3',
        musics: '77',
    },
    {
        id: 7,
        key: '7',
        image: '/Images/user3.png',
        firstName: 'Name',
        lastName: "lastName",
        albums: '4',
        musics: '77',
    },


];

const Artist = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShow = () => {
        setShowDeleteModal(!showDeleteModal)
    }

    const handleClose = () => {
        setShowDeleteModal(false)
    }

    const openArtistForm = () => {
        setShowModal(!showModal)
    }

    const openEditForm = () => {
        setShowEditModal(!showEditModal)
    }


    return (
        <>
            <div className={styles.container}>
                <MultiTaskButton icon={'/Icons/melody.svg'} title='Add Artist' onclick={openArtistForm} />
                <Search placeHolder='Search for Artist' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <ArtistTable remove={handleShow} edit={openEditForm} dataSource={dataSource} />

            {
                showDeleteModal && (
                    <Modal setShowModal={handleShow} >
                        <ConfirmModal text={'Do you want to delte an Artist?'} onclose={handleClose} />
                    </Modal>
                )
            }

            {
                showModal && (
                    <Modal setShowModal={openArtistForm}>
                        <ArtistForm setShowModal={openArtistForm} />
                    </Modal>
                )

            }

            {
                showEditModal && (
                    <Modal setShowModal={openEditForm}>
                        <ArtistForm setShowModal={openEditForm} />
                    </Modal>
                )

            }

        </>

    )
}

export default Artist;