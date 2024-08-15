'use client'
import { useState } from 'react';
import styles from './Header.module.scss';
import Button from '../Button/Button';
import Image from 'next/image';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Modal from '../Modal/Modal';

const Header = () => {
    const [showDetails, setShowDetails] = useState(false);

    const handleOpen = () => {
        setShowDetails(!showDetails)
    }

    const handleClose =()=>{
        setShowDetails(false)
    }

    return (
        <div className={styles.main}>
            <MultiTaskButton icon={'/Icons/Logout.svg'}  onclick={handleOpen}/>
            {
                showDetails &&
                <Modal setShowModal={handleOpen} >
                    <ConfirmModal text={'Do you want to Log-out?'} onclose={handleClose}/>
                </Modal>

            }
        </div>

    )
}
export default Header;