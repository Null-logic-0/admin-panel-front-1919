'use client'
import { useState } from 'react';
import ArtistUserInfoCard from '../ArtistUserInfoCard/ArtistUserInfoCard';
import styles from './Header.module.scss';
import Button from '../Button/Button';

const Header = () => {
    const [showDetails, setShowDetails] = useState(false);

    const handleOpen = () => {
        setShowDetails(!showDetails)
    }

    return (
        <div className={styles.main}>
            <div onClick={handleOpen} className={styles.user}>
                <ArtistUserInfoCard userName='User Name' image='/Images/user.png' />
            </div>
            {
                showDetails &&
                <div className={styles.container}>
                    <p className={styles.text}>Do you want to Log-Out?</p>
                    <div className={styles.buttonsContainer}>

                        <div className={styles.button}>
                            <Button title='Yes' />
                        </div>
                        <div className={styles.button}>
                            <Button title='NO' mode='secondary' onclick={handleOpen} />
                        </div>

                    </div>

                </div>

            }
        </div>

    )
}
export default Header;