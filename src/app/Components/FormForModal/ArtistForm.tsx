'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import styles from './ArtoistForm.module.scss';
import { FormDataInterface } from '@/app/interface/FormForModal.interface';
import Button from '../Button/Button';
import FormInput from './FormInput/FormInput';
import classNames from 'classnames';
import { useState } from 'react';

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
      playlistName: data.playlistName,
      description: data.description,
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
              {...register('firstName', {
                required: 'Artist Name is required',
                maxLength: {
                  value: 20,
                  message: 'Max length is 20 characters',
                },
              })}
              type="text"
              text='Artist Name'
              className={classNames({ [styles.error]: errors.firstName })}
            />
            {errors.firstName && <span className={styles.errorMessage}>{errors.firstName.message}</span>}

          </div>

          <div className={styles.errorContainer}>
            <FormInput
              {...register('lastName', {
                required: 'Artist LastName is required',
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Only letters are allowed',
                },
              })}
              type="text"
              text='Artist LastName'
              className={classNames({ [styles.error]: errors.lastName })}
            />
            {errors.lastName && <span className={styles.errorMessage}>{errors.lastName.message}</span>}

          </div>

        </div>
      </div>
      <div className={styles.errorContainer}>

        <textarea
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 80,
              message: 'Minimum length is 80 characters',
            },
          })}
          placeholder="About..."
          className={classNames(styles.textarea, { [styles.error]: errors.description })}
        />
        {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}

      </div>


      <div className={styles.button}>
        <Button title={'Add'} />
      </div>
    </form>
  );
};

export default ArtistForm;
