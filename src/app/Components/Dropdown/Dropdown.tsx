import { dropDownOptions } from '@/app/interface/dropdown.interface';
import styles from './Dropdown.module.scss';
import Image from 'next/image';

type dropDownProps = {
    options: dropDownOptions[];
}

const Dropdown = ({ options}: dropDownProps) => {
    return (
        <div className={styles.container}>
            {options.map((option,index) => (
                <button  key={index} onClick={option.onclick} className={styles.button}>
                    <Image src={option.icon} alt='icon' width={24} height={24} />
                    {option.title}
                </button>
            ))

            }

        </div>
    )

}

export default Dropdown;