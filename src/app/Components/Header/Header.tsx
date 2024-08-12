'use client'
import { useState } from 'react';
import styles from './Header.module.scss';
import Button from '../Button/Button';
import Image from 'next/image';

const Header = () => {
    const [showDetails, setShowDetails] = useState(false);

    const handleOpen = () => {
        setShowDetails(!showDetails)
    }

    return (
        <div className={styles.main}>
            <div onClick={handleOpen} className={styles.user}>
                <Image src={'/Icons/Logout.svg'} alt='icon' width={30} height={30}/>
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