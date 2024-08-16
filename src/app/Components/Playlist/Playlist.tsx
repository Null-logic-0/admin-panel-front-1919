'use client'
import { useState } from 'react';
import ArtistTable from '../ArtistTable/ArtistTable';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Search from '../Search/Search';
import styles from './Playlist.module.scss'
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import AlbumPlaylistTable from '../AlbumTable/AlbumPlaylistTable';
import { albumPlaylistTableInterface } from '@/app/interface/albumPlaylistTable.interface';
import { dropDownOptions } from '@/app/interface/dropdown.interface';
import Modal from '../Modal/Modal';
import MusicForm from '../FormForModal/MusicModal/MusicForm';
import AlbumForm from '../FormForModal/AlbumForm/AlbumForm';

const dataSource: albumPlaylistTableInterface[] = [
    {
        id: 1,
        key: '1',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 2,
        key: '2',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 3,
        key: '3',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 4,
        key: '4',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 5,
        key: '5',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 6,
        key: '6',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },
    {
        id: 7,
        key: '7',
        image: '/images/CardIMG.png',
        playlistName: 'Name',
        artistName: "lastName",
        songs: '34'
    },


];


const Artist = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddMusicModal, setShowAddMusicModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false);

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

    const openAddPlaylistModal = () => {
        setShowAddPlaylistModal(!showAddPlaylistModal)
    }
    const dropdownOptions: dropDownOptions[] = [
        {
            icon: '/Icons/plus.svg',
            title: 'Add Musics',
            id: 1,
            onclick: addMusicModal,
        },
        {
            icon: '/Icons/penedit.svg',
            title: 'Change playlist Name',
            id: 2,
            onclick: openEditModal,
        },

    ];

    return (
        <>
            <div className={styles.container}>
                <MultiTaskButton icon={'/Icons/Playlist.svg'} title='Add Playlist' onclick={openAddPlaylistModal}/>
                <Search placeHolder='Search for Playlist' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <AlbumPlaylistTable dataSource={dataSource} title={'PLaylist Name'} dropdownOptions={dropdownOptions} remove={handleShow} />

            {
                showDeleteModal && (
                    <Modal setShowModal={handleShow}>
                        <ConfirmModal text={'Do you want to delte Album?'} onclose={handleClose} />
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
                        <AlbumForm setShowModal={openEditModal} />

                    </Modal>
                )
            }


            {
                showAddPlaylistModal && (
                    <Modal setShowModal={openAddPlaylistModal}>
                        <AlbumForm setShowModal={openAddPlaylistModal} />

                    </Modal>
                )

            }


        </>

    )
}

export default Artist;