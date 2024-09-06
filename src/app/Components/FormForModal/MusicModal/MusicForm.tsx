"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import styles from "./MusicForm.module.scss";
import { FormDataInterface } from "@/app/interface/FormForModal.interface";
import Button from "../../Button/Button";
import FormInput from "../FormInput/FormInput";
import { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import { musicTableInterface } from "@/app/interface/musicTable.interface";

type FormProps = {
  setShowModal: (value: boolean) => void;
  addNewMusic?: (newMusic: musicTableInterface) => void;
  music?: musicTableInterface;
  updateMusic?: (music: musicTableInterface) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const MusicForm = ({
  setShowModal,
  addNewMusic,
  music,
  updateMusic,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormDataInterface>();

  const [audio, setAudio] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    if (music) {
      setValue("musicName", music.name);
      setValue("artistName", music.authorName);
      if (music.photo) setImageUploaded(true);
    } else {
      reset();
    }
  }, [music, setValue, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert("File is too large. Maximum allowed size is 5 MB.");
        return;
      }
      setImage(file);
      setFiles((prevFiles) => [...prevFiles, file]);
      setImageUploaded(true);
    }
  };

  const handleUploadMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAudio(file);
      setFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  const onSubmit: SubmitHandler<FormDataInterface> = (data) => {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    formData.append("name", data.musicName || "");
    formData.append("authorName", data.artistName || "");

    const token = localStorage.getItem("accesstoken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    if (music) {
      axios
        .put(
          `https://one919-backend.onrender.com/music/${music.id}`,
          formData,
          { headers }
        )
        .then((response) => {
          const updatedMusic = {
            ...music,
            name: response.data.musicName,
            authorName: response.data.artistName,
            photo: response.data.files,
          };
          updateMusic?.(updatedMusic);
          setShowModal(false);
        })
        .catch((error) => {
          alert(`An error occurred: ${error.message}`);
        });
    } else {
      axios
        .post("https://one919-backend.onrender.com/music", formData, {
          headers,
        })
        .then((response) => {
          const newMusic: musicTableInterface = {
            id: response.data.id,
            key: response.data.id.toString(),
            name: response.data.musicName,
            authorName: response.data.artistName,
            photo: response.data.files,
            music: response.data.files,
          };
          addNewMusic?.(newMusic);
          setShowModal(false);
        })
        .catch((error) => {
          alert(`An error occurred: ${error.message}`);
        });
    }
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <FormInput
            className={classNames({ [styles.error]: errors.musicName })}
            {...register("musicName", {
              required: "Music Name is required",
              maxLength: { value: 20, message: "Max length is 20 characters" },
            })}
            type="text"
            text="Music Name"
          />
          {errors.musicName && (
            <span className={styles.errorMessage}>
              {errors.musicName.message}
            </span>
          )}
        </div>
        <div className={styles.inputs}>
          <FormInput
            className={classNames({ [styles.error]: errors.artistName })}
            {...register("artistName", {
              required: "Artist Name is required",
              maxLength: { value: 20, message: "Max length is 20 characters" },
            })}
            type="text"
            text="Artist Name"
          />
          {errors.artistName && (
            <span className={styles.errorMessage}>
              {errors.artistName.message}
            </span>
          )}
        </div>
        <div className={styles.uploadContainer}>
          <div className={styles.fileContainer}>
            <div className={styles.info}>
              <p>Upload Image</p>
              {imageUploaded && (
                <Image
                  src={"/Icons/wellDone.png"}
                  alt="icon"
                  width={24}
                  height={24}
                />
              )}
            </div>
            <div className={styles.upload}>
              <label htmlFor="imageInput" className={styles.label}>
                <Image
                  src={"/Icons/pluss.png"}
                  width={60}
                  height={60}
                  alt="icon"
                />
              </label>
              <input
                type="file"
                id="imageInput"
                className={styles.uploader}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className={styles.fileContainer}>
            <div className={styles.info}>
              <p>Upload Music</p>
              {audio && (
                <Image
                  src={"/Icons/wellDone.png"}
                  alt="icon"
                  width={24}
                  height={24}
                />
              )}
            </div>
            <div className={styles.upload}>
              <label htmlFor="musicInput" className={styles.label}>
                <Image
                  src={"/Icons/addMusic.svg"}
                  width={60}
                  height={60}
                  alt="icon"
                />
              </label>
              <input
                type="file"
                id="musicInput"
                className={styles.uploader}
                accept="audio/*"
                onChange={handleUploadMusic}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.button}>
        <Button title={music ? "Update" : "Add"} />
      </div>
    </form>
  );
};

export default MusicForm;
