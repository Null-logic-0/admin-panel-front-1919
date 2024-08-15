import React from 'react';
import styles from './HideButton.module.scss'
import Image from 'next/image';

interface ToggleButtonProps {
  toggleShowPassword?: () => void;
}

const HideButton = ({ toggleShowPassword }:ToggleButtonProps) => {
  return (
    <button className={styles.hideBTN} onClick={toggleShowPassword}>
      <Image src={'/Icons/eye-crossed.svg'} alt='icon' width={24} height={24} />
    </button>
  );
};

export default HideButton;
