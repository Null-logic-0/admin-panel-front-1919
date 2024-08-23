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

const initialDataSource: ArtistTableInterFace[] = [
];

const Artist = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false);
    const [dataSource, setDataSource] = useState<ArtistTableInterFace[]>(initialDataSource);

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

    const addNewArtist = (newArtist: ArtistTableInterFace) => {
        setDataSource(prevDataSource => [...prevDataSource, newArtist]);
    };


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
                        <ArtistForm setShowModal={openArtistForm} addNewArtist={addNewArtist}/>
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