'use client'
import { UserTableInterFace } from '@/app/interface/UserTable.interface';
import Search from '../Search/Search';
import UserTable from '../UserTable/UserTable';
import styles from './User.module.scss';
import { useState } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Modal from '../Modal/Modal';
import PasswordForm from '../FormForModal/PasswordForm/PasswordForm';
import Dropdown from '../Dropdown/Dropdown';
import { dropDownOptions } from '@/app/interface/dropdown.interface';

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
        id: 3,
        key: '3',
        email: 'UserGmail@gmail.com',
    },
    {
        id: 4,
        key: '4',
        email: 'UserGmail@gmail.com',
    },
    {
        id: 5,
        key: '5',
        email: 'UserGmail@gmail.com',
    },


];


const User = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);


    const handleShow = () => {
        setShowDeleteModal(!showDeleteModal)
    }

    const handleClose = () => {
        setShowDeleteModal(false)
    }

    const openBlockModal = () => {
        setShowBlockModal(true)
    }

    const closeBlockModal = () => {
        setShowBlockModal(false)
    }

    const openChangePassword = () => {
        setShowPasswordModal(!showPasswordModal)
    }

   

    const dropdownOptions: dropDownOptions[] = [
        {
            icon: '/Icons/block.svg',
            title: 'Block User',
            onclick: openBlockModal,
            id: 1
        },
        {
            icon: '/Icons/Edit.svg',
            title: 'Change Password',
            onclick: openChangePassword,
            id: 2
        },
    ];

    return (
        <>
            <div className={styles.container}>
                <Search placeHolder='Search for User' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <UserTable dataSource={dataSource} remove={handleShow} dropdownOptions={dropdownOptions} />



            {
                showDeleteModal && (
                    <Modal setShowModal={handleShow}>
                        <ConfirmModal text={'Do you want to delete User?'} onclose={handleClose} />
                    </Modal>
                )
            }

            {
                showBlockModal && (
                    <Modal setShowModal={openBlockModal}>
                        <ConfirmModal text='Do you want to Block User?' onclose={closeBlockModal} />
                    </Modal>

                )
            }

            {
                showPasswordModal && (
                    <Modal setShowModal={openChangePassword}>
                        <PasswordForm setShowModal={openChangePassword} />
                    </Modal>
                )
            }



        </>

    )
}
export default User;