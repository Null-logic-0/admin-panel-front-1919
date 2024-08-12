'use client'
import { useState } from 'react';
import styles from './Header.module.scss';
import Button from '../Button/Button';
import Image from 'next/image';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';

const Header = () => {
    const [showDetails, setShowDetails] = useState(false);

    const handleOpen = () => {
        setShowDetails(!showDetails)
    }

    return (
        <div className={styles.main}>
            <MultiTaskButton icon={'/Icons/Logout.svg'}  onclick={handleOpen}/>
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