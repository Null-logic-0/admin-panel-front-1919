'use client'
import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    setShowModal:(value: boolean) => void;

}

const Modal = ({ isOpen, children,setShowModal }: ModalProps) => {
    if (!isOpen) return null;
    const handleCloseModal =()=>{
        setShowModal(false)

    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.header} >
                    
                    <MultiTaskButton onclick={handleCloseModal} icon={'/icons/close.svg'}/>

                </div>

                <>
                    {children}
                </>
               
            </div>
        </div>
    );
};

export default Modal;
