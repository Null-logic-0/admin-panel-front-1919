'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import styles from './AlbumForm.module.scss';
import { FormDataInterface } from '@/app/interface/FormForModal.interface';
import classNames from 'classnames';
import { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import Button from '../../Button/Button';

type FormProps = {
  setShowModal: (value: boolean) => void;
}

const ArtistForm = ({ setShowModal }: FormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormDataInterface>();
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

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
      albumName: data.albumName,
      artistName: data.artistName,
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

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <p>Upload Image</p>
            {imageUploaded && (
              <Image src={'/Icons/wellDone.png'} alt='icon' width={24} height={24} />
            )}
          </div>
          <div className={styles.upload}>
            <label htmlFor="fileInput" className={styles.label}>
              <Image src={'/icons/pluss.png'} width={63} height={63} alt="icon" />
            </label>
            <input
              type="file"
              id="fileInput"
              className={styles.uploader}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className={styles.inputs}>
          <div className={styles.errorContainer}>
            <FormInput
              {...register('albumName', {
                required: 'Album Name is required',
                maxLength: {
                  value: 20,
                  message: 'Max length is 20 characters',
                },
              })}
              type="text"
              text='Album Name'
              className={classNames({ [styles.error]: errors.firstName })}
            />
            {errors.albumName && <span className={styles.errorMessage}>{errors.albumName.message}</span>}

          </div>

          <div className={styles.errorContainer}>
            <FormInput
              {...register('artistName', {
                required: 'Album artistName is required',
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Only letters are allowed',
                },
              })}
              type="text"
              text='Album ArtistName'
              className={classNames({ [styles.error]: errors.lastName })}
            />
            {errors.artistName && <span className={styles.errorMessage}>{errors.artistName.message}</span>}

          </div>

        </div>
      </div>

      <div className={styles.button}>
        <Button title={'Edit'} />
      </div>
    </form>
  );
};

export default ArtistForm;
