'use client'
import { useState } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import styles from './SongModal.module.scss';
import SongTable from './SongTable/SongTable';
import Search from '../Search/Search';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';

type modalProps = {
    onClose?:()=>void
}

const SongModal = ({onClose}:modalProps) =>{
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className={styles.main}>
            <div className={styles.button}>
                <MultiTaskButton icon={'/Icons/closeX.svg'} onclick={onClose} />
            </div>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeHolder={'search songs...'} />
            <div className={styles.container}>
                <SongTable/>
            </div>
        </div>
    )
}

export default SongModal;