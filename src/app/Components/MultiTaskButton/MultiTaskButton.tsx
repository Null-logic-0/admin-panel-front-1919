import styles from './MultiTaskButton.module.scss';
import Image from 'next/image';

type buttonProps ={
    icon:string;
    onclick?:()=>void;
    title?:string;

}

const MultiTaskButton =({icon,onclick,title}:buttonProps)=>{
    return (
        <button onClick={onclick} className={styles.button}>
            <Image src={icon} alt='icon' width={32} height={32} className={styles.icon}/>
            {title}
        </button>
    )
}

export default MultiTaskButton;