import { ReactNode } from 'react';
import styles from './Button.module.scss';

type buttonProps = {
    title: ReactNode;
    mode?: 'secondary';
    onclick?: () => void;
    disabled?:boolean;
}

const Button = ({ title, mode, onclick,disabled }: buttonProps) => {
    const classNames = [styles.button];

    if (mode == 'secondary') classNames.push(styles.secondary);

    return (
        <button onClick={onclick} className={classNames.join(' ').trim()}>
            {title}
        </button>
    )
}

export default Button;