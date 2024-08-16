import { dropDownOptions } from '@/app/interface/dropdown.interface';
import styles from './Dropdown.module.scss';
import Image from 'next/image';

type dropDownProps = {
    options: dropDownOptions[];
    onOptionSelect: () => void;
}

const Dropdown = ({ options, onOptionSelect }: dropDownProps) => {
    return (
        <div className={styles.container}>
            {options.map((option, index) => (
                <button key={index}
                    onClick={() => {
                        if (option.onclick) {
                            option.onclick();
                        }
                        onOptionSelect();
                    }}
                    className={styles.button}>
                    <Image src={option.icon} alt='icon' width={24} height={24} />
                    {option.title}
                </button>
            ))

            }

        </div>
    )

}

export default Dropdown;