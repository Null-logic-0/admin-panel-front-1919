'use client'
import Button from '../Button/Button';
import styles from './ConfirmModal.module.scss';

type ConfirmModalProps = {
    text: string;
    onclose?: () => void;
    onclick?: () => void;
}


const ConfirmModal = ({ text, onclose, onclick }: ConfirmModalProps) => {
    return (
        <div className={styles.main}>
            <p className={styles.text}>{text}</p>

            <div className={styles.container}>
                <Button title='No' mode='secondary' onclick={onclose} />
                <Button title='Yes' onclick={onclick} />

            </div>

        </div>

    )
}

export default ConfirmModal;