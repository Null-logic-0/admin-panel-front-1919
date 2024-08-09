import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import styles from './FormForModal.module.scss';
import { FormDataInterface } from '@/app/interface/FormForModal.interface';
import Button from '../Button/Button';
import FormInput from './FormInput/FormInput';

type FormProps = {
  setShowModal: (value: boolean) => void;
}

const PlayListFrom = ({ setShowModal }: FormProps) => {
  const { register, handleSubmit, setValue } = useForm<FormDataInterface>();

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
    }
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
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

        <div className={styles.inputs}>
          <FormInput
            {...register('playlistName')}
            type="text"
            text='Artist Name'
          />
          <FormInput
            {...register('playlistName')}
            type="text"
            text='Artist LastName'
          />

        </div>
      </div>
      <textarea
        {...register('description')}
        placeholder="About..."
        className={styles.textarea}
      />
      <div className={styles.button}>
        <Button title={'Add'} />

      </div>

    </form>
  );
};

export default PlayListFrom;
