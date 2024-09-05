import { useState } from "react";
import styles from "./Search.module.scss";
import Image from "next/image";
import CloseButton from "../CloseButton/CloseButton";

type searchProps = {
  icon?: boolean;
  placeHolder: string;
  onchange?: (value: string) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  onSearch: () => void; 
  mode?: 'secondary';
};

const Search = ({
  icon,
  placeHolder,
  onchange,
  setSearchTerm,
  searchTerm,
  onSearch, 
  mode
}: searchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onchange) {
      onchange(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(); 
    }
  };

  const clearInput = () => {
    setSearchTerm("");
    if (onchange) {
      onchange("");
    }
  };

  const inputClassNames = [styles.input];
  if (mode === 'secondary') inputClassNames.push(styles.secondary);

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        {icon && (
          <Image
            src={"/icons/Search.svg"}
            alt="search icon"
            width={24}
            height={24}
            className={styles.icon}
          />
        )}
        <input
          type="text"
          placeholder={placeHolder}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} 
          value={searchTerm}
          className={inputClassNames.join(' ').trim()}
        />

        {searchTerm && (
          <div className={styles.closeButton}>
            <CloseButton onclick={clearInput} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
