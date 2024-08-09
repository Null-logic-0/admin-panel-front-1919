import styles from  './Button.module.scss';

type buttonProps = {
    title:string;
    mode?: 'secondary';
    size?: 'small'| 'large';
    onclick?:()=>void;
}

const Button =({title,mode,size,onclick}:buttonProps)=>{
    const classNames =[styles.button];

    if (size == 'large') classNames.push(styles.large);
    else classNames.push(styles.small);

    if (mode == 'secondary') classNames.push(styles.secondary);

    return (
        <button onClick={onclick} className={classNames.join(' ').trim()}>
            {title}
        </button>
    )
}

export default Button;