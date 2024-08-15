'use client'
import Search from '../Search/Search';
import UserTable from '../UserTable/UserTable';
import styles from './User.module.scss';
import { useState } from 'react';

   

const User = () => {
    const [searchTerm, setSearchTerm] = useState('');



    return (
        <>
            <div className={styles.container}>
                <Search placeHolder='Search for User' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
           <UserTable  />

        </>

    )
}
export default User;