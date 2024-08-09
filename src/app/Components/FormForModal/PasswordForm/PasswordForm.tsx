import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import styles from './PasswordForm.module.scss';
import FormInput from '../FormInput/FormInput';
import classNames from 'classnames';
import { FormInterface } from '@/app/interface/Form.interface';

type FormProps = {
    setShowModal: (value: boolean) => void;
  }
const PasswordForm = ({setShowModal}:FormProps) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormInterface>();

    const submitRegister = (values: FormInterface) => {
        console.log('values', values);
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit(submitRegister)}>
                <FormInput
                    type='password'
                    text='Create a password'
                    className={classNames({ [styles.inputError]: errors.password })}
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters'
                        }
                    })}
                />
                {errors.password && <span className={styles.error}>{errors.password.message}</span>}

                <FormInput
                    type='password'
                    text='Repeat password'
                    className={classNames({ [styles.inputError]: errors.passwordRepeat })}
                    {...register('passwordRepeat', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                            value === watch('password') || 'Passwords do not match'
                    })}
                />
                {errors.passwordRepeat && <span className={styles.error}>{errors.passwordRepeat.message}</span>}
            <div className={styles.button}>

                <Button title='Sign in' />

            </div>

        </form>
    )
}

export default PasswordForm;