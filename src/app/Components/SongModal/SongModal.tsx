'use client'
import { useState } from 'react';
import styles from './SongModal.module.scss';
import SongTable from './SongTable/SongTable';
import Search from '../Search/Search';
import axios from 'axios';
import { albumTableInterface } from '@/app/interface/albumTable.interface';

type modalProps = {
    setShowModal: (value: boolean) => void;
    showAddButton?:boolean
    albumId:string | null;
}

const SongModal = ({setShowModal,showAddButton,albumId}:modalProps) =>{    
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSource, setDataSource] = useState<albumTableInterface[]>([]);

    const handleSearch = () => {
        axios
          .get(`https://one919-backend.onrender.com/search?q=${searchTerm}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          })
          .then((response) => {
            setDataSource(response.data);
          })
          .catch((error) => {
          });
      };
    return (
        <div className={styles.main}>
        
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeHolder={'search songs...'}  onSearch={handleSearch}/>
            <div className={styles.container}>
                <SongTable showAddButton={showAddButton} albumId={albumId} searchTerm={searchTerm}/>
            </div>
        </div>
    )
}

export default SongModal;