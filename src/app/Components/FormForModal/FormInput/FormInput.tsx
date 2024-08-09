import React, { forwardRef, useState } from "react";
import styles from "./FromInput.module.scss";

type Props = {
  type: "text" | "password";
  text?: string;
  className?: string;
  register?: React.Ref<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, Props>(({ type, text ,className, register, ...rest }, ref) => {
  

  return (
    <div className={styles.container}>
      <label className={styles.label}>{text}</label>

        <input
          type={type === "password"  ? 'text' : type}
          className={`${styles.input} ${className}`}
          ref={ref}
          {...rest}
        />


    </div>
  );
});

Input.displayName = "Input";

export default Input;
