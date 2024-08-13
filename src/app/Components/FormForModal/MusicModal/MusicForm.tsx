'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import styles from './MusicForm.module.scss';
import { FormDataInterface } from '@/app/interface/FormForModal.interface';
import Button from '../../Button/Button';
import FormInput from '../FormInput/FormInput';
import { useState } from 'react';
import classNames from 'classnames';

type FormProps = {
    setShowModal: (value: boolean) => void;
}

const MusicForm = ({ setShowModal }: FormProps) => {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm<FormDataInterface>();
    const [audio, setAudio] = useState<string | null>(null);
    const [imageUploaded, setImageUploaded] = useState<boolean>(false);
    const [musicUploaded, setMusicUploaded] = useState<boolean>(false);

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });

    const onSubmit: SubmitHandler<FormDataInterface> = async (data) => {
        const formData = {
            img: data.img,
            musicName: data.musicName,
            musicFile: audio,
        };
        setShowModal(false);
        console.log('Form Data:', formData);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const base64 = await toBase64(e.target.files[0]);
            setValue('img', base64);
            setImageUploaded(true);
        }
    };

    const handleUploadMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const musicUrl = URL.createObjectURL(e.target.files[0]);
            setAudio(musicUrl);
            setMusicUploaded(true);
        }
    };

    return (
        <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <div className={styles.inputs}>
                    <FormInput
                        className={classNames({ [styles.error]: errors.musicName })}
                        {...register('musicName', {
                            required: 'Music Name is required',
                            maxLength: { value: 20, message: 'Max length is 20 characters' }
                        })}
                        type="text"
                        text='Music Name'
                    />
                    {errors.musicName && <span className={styles.errorMessage}>{errors.musicName.message}</span>}
                </div>
                <div className={styles.uploadContainer}>
                    <div className={styles.fileContainer}>
                        <div className={styles.info}>
                            <p>Upload Image</p>
                            {
                                imageUploaded && (
                                    <Image src={'/Icons/wellDone.png'} alt='icon' width={24} height={24} />
                                )
                            }
                        </div>
                        <div className={styles.upload}>
                            <label htmlFor="imageInput" className={styles.label}>
                                <Image src={'/icons/pluss.png'} width={60} height={60} alt="icon" />
                            </label>
                            <input
                                type="file"
                                id="imageInput"
                                className={styles.uploader}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className={styles.fileContainer}>
                        <div className={styles.info}>
                            <p>Upload Music</p>
                            {
                                musicUploaded && (
                                    <Image src={'/Icons/wellDone.png'} alt='icon' width={24} height={24} />
                                )
                            }
                        </div>
                        <div className={styles.upload}>
                            <label htmlFor="musicInput" className={styles.label}>
                                <Image src={'/icons/addMusic.svg'} width={60} height={60} alt="icon" />
                            </label>
                            <input
                                type="file"
                                id="musicInput"
                                className={styles.uploader}
                                accept="audio/*"
                                onChange={handleUploadMusic}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.button}>
                <Button title={'Add'} />
            </div>
        </form>
    );
};

export default MusicForm;
