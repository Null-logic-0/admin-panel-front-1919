'use client'
import { useState } from 'react';
import ArtistTable from '../ArtistTable/ArtistTable';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Search from '../Search/Search';
import styles from './Artist.module.scss'
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Modal from '../Modal/Modal';
import ArtistForm from '../FormForModal/ArtistForm';


const Artist = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false)

    const handleShow = () => {
        setShowDeleteModal(!showDeleteModal)
    }

    const handleClose = () => {
        setShowDeleteModal(false)
    }

    const openArtistForm =()=>{
        setShowEditModal(!showEditModal)
    }

   


    return (
        <>
            <div className={styles.container}>
                <MultiTaskButton icon={'/Icons/melody.svg'} title='Add Artist' onclick={openArtistForm}/>
                <Search placeHolder='Search for Artist' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <ArtistTable remove={handleShow} edit={openArtistForm} />

            {
                showDeleteModal && (
                    <Modal setShowModal={handleShow} >
                        <ConfirmModal text={'Do you want to delte an Artist?'} onclose={handleClose} />
                    </Modal>
                )
            }

            {
                showEditModal && (
                    <Modal setShowModal={openArtistForm}>
                        <ArtistForm setShowModal={openArtistForm} />
                    </Modal>
                )

            }

        </>

    )
}

export default Artist;