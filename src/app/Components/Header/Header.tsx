'use client'
import { useState } from 'react';
import styles from './Header.module.scss';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Modal from '../Modal/Modal';
import { authState } from '@/app/helpers/authState';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

const Header = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [auth, setAuth] = useRecoilState(authState);
    const router = useRouter();

    const handleOpen = () => {
        setShowDetails(prev => !prev);
    };

    const handleLogout = () => {
        const accessToken = localStorage.getItem('accesstoken');

        if (!accessToken) {
            router.push('/auth');
            return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const response = axios.put(
            'https://one919-backend.onrender.com/auth/admin/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        ).then(() => {
            localStorage.removeItem('accesstoken')
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('auth');

            setAuth({
                isAuthenticated: false,
                Admin: null,
                role:''
            });
            router.push('/auth')
        })
    };

    const handleClose =()=>{
        setShowDetails(false)
    }

    return (
        <div className={styles.main}>
            <MultiTaskButton icon={'/Icons/Logout.svg'}  onclick={handleOpen}/>
            {
                showDetails &&
                <Modal setShowModal={handleOpen} >
                    <ConfirmModal text={'Do you want to Log-out?'} onclose={handleClose} onclick={handleLogout}/>
                </Modal>

            }
        </div>

    )
}
export default Header;