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
  mode?:'secondary';
};
const Search = ({
  icon,
  placeHolder,
  onchange,
  setSearchTerm,
  searchTerm,
  mode
}: searchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onchange) {
      onchange(value);
    }
  };

  const clearInput = () => {
    setSearchTerm("");
    if (onchange) {
      onchange("");
    }
  };
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
          value={searchTerm}
          className={`${styles.input} ${styles.secondary}`}
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
