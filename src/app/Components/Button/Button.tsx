import styles from './Button.module.scss';

type buttonProps = {
    title: string;
    mode?: 'secondary';
    onclick?: () => void;
}

const Button = ({ title, mode, onclick }: buttonProps) => {
    const classNames = [styles.button];

    if (mode == 'secondary') classNames.push(styles.secondary);

    return (
        <button onClick={onclick} className={classNames.join(' ').trim()}>
            {title}
        </button>
    )
}

export default Button;