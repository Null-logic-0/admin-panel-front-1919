"use client";

import classNames from "classnames";
import Input from "../Input/Input";
import styles from "./AuthForm.module.scss";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Image from "next/image";
import { loginFormInterface } from "@/app/interface/Login.interface";
import { authState } from "@/app/helpers/authState";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useState } from "react";
import Spinner from "../LoadingSpiner/Spiner";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<loginFormInterface>();
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLoginSuccess = (data: any) => {
    const { access_token, refresh_token, role } = data;

    localStorage.setItem(
      "auth",
      JSON.stringify({
        isAuthenticated: true,
        accessToken: access_token,
        refreshToken: refresh_token,
        role: role,
      })
    );

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    setAuth({
      isAuthenticated: true,
      role: role,
    });

    router.push("/");
    localStorage.setItem("accesstoken", access_token);
  };

  const submitLogin = async (values: loginFormInterface) => {
    setLoading(true);

    try {
      const { data, status } = await axios.post(
        "https://one919-backend.onrender.com/auth/admin/login",
        values
      );
      console.log(data, "data");
      if (status === 200 || status === 201) {
        handleLoginSuccess(data);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.main}>
      <Image src={"/Icons/Logo.svg"} alt="logo" width={100} height={105} />
      <p className={styles.title}>Login in to TnNdshN Admin Panel</p>

      <form className={styles.form} onSubmit={handleSubmit(submitLogin)}>
        <div className={styles.inputs}>
          <Input
            type="email"
            text="Enter your E-mail"
            className={classNames({ [styles.inputError]: errors.email })}
            {...register("email", {
              required: "E-mail is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match E-mail format",
              },
            })}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}

          <Input
            type="password"
            showHideButton
            text="Password"
            className={classNames({ [styles.inputError]: errors.password })}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
        <div className={styles.button}>
          <Button
            title={loading ? "Logging in..." : "Log in"}
            disabled={loading}
          />
        </div>
      </form>
      {loading && (
        <div className={styles.background}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default AuthForm;
