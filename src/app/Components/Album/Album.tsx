'use client'
import {  useState } from 'react';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Search from '../Search/Search';
import styles from './Album.module.scss'
import AlbumPlaylistTable from '../AlbumTable/AlbumPlaylistTable';
import { albumPlaylistTableInterface } from '@/app/interface/albumPlaylistTable.interface';
import { dropDownOptions } from '@/app/interface/dropdown.interface';
import Modal from '../Modal/Modal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import MusicForm from '../FormForModal/MusicModal/MusicForm';
import AlbumForm from '../FormForModal/AlbumForm/AlbumForm';
import SongModal from '../SongModal/SongModal';


const dataSource: albumPlaylistTableInterface[] = [
    {
        id: 1,
        key: '1',
        image: '/images/CardIMG.png',
        playlistName: 'playlsitName',
        artistName: "artistName",
        songs: '34'
    },
    {
        id: 2,
        key: '2',
        image: '/images/CardIMG.png',
        playlistName: 'playlistName',
        artistName: "artistName",
        songs: '34'
    },
    {
        id: 3,
        key: '3',
        image: '/images/CardIMG.png',
        playlistName: 'palylsitName',
        artistName: "artistName",
        songs: '34'
    },
    {
        id: 4,
        key: '4',
        image: '/images/CardIMG.png',
        playlistName: 'playlistName',
        artistName: "artistName",
        songs: '34'
    },
    {
        id: 5,
        key: '5',
        image: '/images/CardIMG.png',
        playlistName: 'playlistName',
        artistName: "artistName",
        songs: '34'
    },
    {
        id: 6,
        key: '6',
        image: '/images/CardIMG.png',
        playlistName: 'playlistName',
        artistName: "artistName",
        songs: '34'
    },
    {
        id: 7,
        key: '7',
        image: '/images/CardIMG.png',
        playlistName: 'playlistName',
        artistName: "artistName",
        songs: '34'
    },


];


const Album = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddMusicModal, setShowAddMusicModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [showDeleteSongModal, setShowDeleteSongModal] = useState(false);
    const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);


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

    const openSongDelteModal = () => {
        setShowDeleteSongModal(!showDeleteSongModal)

    }

    const openAddAlbumModal = () => {
        setShowAddAlbumModal(!showAddAlbumModal)
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
            title: 'Change Album Name',
            id: 2,
            onclick: openEditModal,
        },
        {
            icon: '/Icons/delete.svg',
            title: 'Delete playlist music',
            id: 3,
            onclick: openSongDelteModal
        },
    ];


    return (
        <>
            <div className={styles.container}>
                <MultiTaskButton icon={'/Icons/albums.svg'} title='Add Album' onclick={openAddAlbumModal} />
                <Search placeHolder='Search for Album' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <AlbumPlaylistTable dataSource={dataSource} title={'Album Name'} dropdownOptions={dropdownOptions} remove={handleShow} />

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
                showDeleteSongModal && (
                    <Modal setShowModal={openSongDelteModal}>
                        <SongModal setShowModal={openSongDelteModal} />

                    </Modal>


                )
            }

            {
                showAddAlbumModal && (
                    <Modal setShowModal={openAddAlbumModal}>
                        <AlbumForm setShowModal={openAddAlbumModal} />

                    </Modal>
                )

            }

        </>

    )
}

export default Album;