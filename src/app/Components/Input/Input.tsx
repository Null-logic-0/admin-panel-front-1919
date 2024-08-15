import React, { forwardRef, useState } from "react";
import HideButton from "./HideButton/HideButton";
import styles from "./Input.module.scss";
import { RegisterOptions } from 'react-hook-form';

type Props = {
  type: "email" | "password";
  text?: string;
  showHideButton?: boolean;
  className?: string;
  register?: React.Ref<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, Props>(({ type, text, showHideButton, className, register, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label className={styles.label}>{text}</label>

      <div className={styles.container}>
        <input
          type={type === "password" && showPassword ? 'text' : type}
          className={`${styles.input} ${className}`}
          ref={ref}
          {...rest}
        />

        {showHideButton && (
          <HideButton toggleShowPassword={toggleShowPassword} />
        )}
      </div>

    </>
  );
});

Input.displayName = "Input";

export default Input;
