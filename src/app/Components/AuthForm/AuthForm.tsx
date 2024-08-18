'use client'
import classNames from 'classnames';
import Input from '../Input/Input';
import styles from './AuthForm.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Image from 'next/image';
import { loginFormInterface } from '@/app/interface/Login.interface';


const AuthForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<loginFormInterface>();

    const submitRegister = (values: loginFormInterface) => {
        console.log('values', values);
    }
    return (
        <div className={styles.main}>
            <Image src={'/Icons/Logo.svg'} alt='logo' width={100} height={105}/>
            <p className={styles.title}>Login in to TnNdshN Admin Panel</p>


            <form className={styles.form} onSubmit={handleSubmit(submitRegister)}>
                <div className={styles.inputs}>
                    <Input
                        type='email'
                        text='Enter your E-mail'
                        className={classNames({ [styles.inputError]: errors.email })}
                        {...register('email', {
                            required: 'E-mail is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Entered value does not match E-mail format'
                            }
                        })}
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                    <Input
                        type='password'
                        showHideButton
                        text='Password'
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

                </div>
                <div className={styles.button}>
                    <Button title='Log in' />

                </div>


            </form>

        </div>
    )
}

export default AuthForm;