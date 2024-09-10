import { dropDownOptions } from '@/app/interface/dropdown.interface';
import styles from './Dropdown.module.scss';
import Image from 'next/image';

type dropDownProps = {
  options: dropDownOptions[];
  onOptionSelect: () => void;
};

const Dropdown = ({ options, onOptionSelect }: dropDownProps) => {
  return (
    <div className={styles.container}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => {
            if (option.onclick) {
              option.onclick(option.id); 
            }
            onOptionSelect(); 
          }}
          className={styles.button}
        >
          <Image src={option.icon} alt="icon" width={24} height={24} />
          {option.title}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
