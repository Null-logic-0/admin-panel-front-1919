'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import styles from "./AlbumForm.module.scss";
import { FormDataInterface } from "@/app/interface/FormForModal.interface";
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import FormInput from "../FormInput/FormInput";
import Button from "../../Button/Button";
import { albumTableInterface } from "@/app/interface/albumTable.interface";

type FormProps = {
  setShowModal: (value: boolean) => void;
  addNewAlbum?: (newAlbum: albumTableInterface) => void;
  album?: albumTableInterface;
  updateAlbum?: (album: albumTableInterface) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const AlbumForm = ({
  setShowModal,
  addNewAlbum,
  album,
  updateAlbum,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormDataInterface>();

  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (album) {
      setValue("title", album.title);
      setValue("authorName", album.authorName);
      setImageUploaded(!!album.photo);
    } else {
      reset();
      setImageUploaded(false);
    }
  }, [album, setValue, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        alert("File is too large. Maximum allowed size is 5 MB.");
        return;
      }

      setValue("photo", file);
      setImageUploaded(true);
    }
  };

  const onSubmit: SubmitHandler<FormDataInterface> = (data) => {
    if (!data.title) {
      alert("Album Name is required!");
      return;
    }

    const formData = new FormData();
    if (data.photo) {
      formData.append("file", data.photo as File);
    }
    formData.append("title", data.title || "");
    formData.append("authorName", data.authorName || "");

    const token = localStorage.getItem("accesstoken");
    if (!token) {
      alert("No token found in localStorage");
      return;
    }

    let request;
    if (album) {
      request = axios
        .put(
          `https://one919-backend.onrender.com/album/${album.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          const updatedAlbum = {
            ...album,
            title: response.data.title,
            authorName: response.data.authorName,
            photo: response.data.photo.url,
          };
          updateAlbum?.(updatedAlbum);
          setShowModal(false);
        })
        .catch((error) => {
          alert(`An error occurred: ${error.message}`);
        });
    } else {
      request = axios
        .post("https://one919-backend.onrender.com/album", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const albumData: albumTableInterface = {
            id: response.data.id,
            key: response.data.id.toString(),
            photo: response.data.photo.url,
            title: response.data.title,
            authorName: response.data.authorName,
          };
          addNewAlbum?.(albumData);
          reset();
          setImageUploaded(false);
          setShowModal(false);
        })
        .catch((error) => {
          alert(
            `An error occurred: ${
              error.response?.data?.message || error.message
            }`
          );
        });
    }
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
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
            <label htmlFor="fileInput" className={styles.label}>
              <Image
                src={"/Icons/pluss.png"}
                width={63}
                height={63}
                alt="icon"
              />
            </label>
            <input
              type="file"
              id="fileInput"
              className={styles.uploader}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className={styles.inputs}>
          <div className={styles.errorContainer}>
            <FormInput
              {...register("title", {
                required: "Album Name is required",
                maxLength: {
                  value: 20,
                  message: "Max length is 20 characters",
                },
              })}
              type="text"
              text="Album Name"
              className={classNames({ [styles.error]: errors.title })}
            />
            {errors.title && (
              <span className={styles.errorMessage}>
                {errors.title.message}
              </span>
            )}
          </div>

          <div className={styles.errorContainer}>
            <FormInput
              {...register("authorName", {
                required: "Artist Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: "Only letters and spaces are allowed",
                },
              })}
              type="text"
              text="Artist Name"
              className={classNames({ [styles.error]: errors.authorName })}
            />
            {errors.authorName && (
              <span className={styles.errorMessage}>
                {errors.authorName.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.button}>
        <Button title={album ? "Update" : "Add"} />
      </div>
    </form>
  );
};

export default AlbumForm;
