import React, { forwardRef } from "react";
import styles from "./FormInput.module.scss";

type Props = {
  type: "text" | "password";
  text?: string;
  className?: string;
};

const FormInput = forwardRef<HTMLInputElement, Props>(({ type, text, className, ...rest }, ref) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{text}</label>
      <input
        type={type === "password" ? "password" : type}
        className={`${styles.input} ${className}`}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

FormInput.displayName = "FormInput";

export default FormInput;
