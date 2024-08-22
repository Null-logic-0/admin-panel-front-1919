'use client'
import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';

interface ModalProps {
    children: ReactNode;
    setShowModal:(value: boolean) => void;

}

const Modal = ({ children,setShowModal }: ModalProps) => {
    const handleCloseModal =()=>{
        setShowModal(false)

    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.header} >
                    
                    <MultiTaskButton onclick={handleCloseModal} icon={'/Icons/close.svg'}/>

                </div>

                <>
                    {children}
                </>
               
            </div>
        </div>
    );
};

export default Modal;
