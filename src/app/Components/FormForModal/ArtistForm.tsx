"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import styles from "./ArtistForm.module.scss";
import { FormDataInterface } from "@/app/interface/FormForModal.interface";
import Button from "../Button/Button";
import FormInput from "./FormInput/FormInput";
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArtistTableInterFace } from "@/app/interface/artistTable.interface";

type FormProps = {
  setShowModal: (value: boolean) => void;
  addNewArtist?: (newArtist: ArtistTableInterFace) => void;
  artist?: ArtistTableInterFace;
  updateArtist?: (artist: ArtistTableInterFace) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ArtistForm = ({
  setShowModal,
  addNewArtist,
  artist,
  updateArtist,
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
    if (artist) {
      setValue("firstName", artist.firstName);
      setValue("lastName", artist.lastName);
      setValue("biography", artist.biography || "");
      setImageUploaded(!!artist.photo);
    } else {
      reset();
      setImageUploaded(false);
    }
  }, [artist, setValue, reset]);

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
    const formData = new FormData();
    if (data.photo) {
      formData.append("img", data.photo as File);
    }
    formData.append("firstName", data.firstName || "");
    formData.append("lastName", data.lastName || "");
    formData.append("biography", data.biography || "");

    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    let request;
    if (artist) {
      request = axios.put(
        `https://one919-backend.onrender.com/author/${artist.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      request = axios.post(
        "https://one919-backend.onrender.com/author",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    request
      .then((response) => {
        const artistData: ArtistTableInterFace = {
          id: response.data.id,
          key: response.data.id.toString(),
          photo: response.data.photo.url,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        };

        if (artist) {
          updateArtist?.(artistData);
        } else {
          addNewArtist?.(artistData);
        }

        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert(`An error occurred: ${error.message}`);
      });
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
              {...register("firstName", {
                required: "Artist Name is required",
                maxLength: {
                  value: 20,
                  message: "Max length is 20 characters",
                },
              })}
              type="text"
              text="Artist Name"
              className={classNames({ [styles.error]: errors.firstName })}
            />
            {errors.firstName && (
              <span className={styles.errorMessage}>
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className={styles.errorContainer}>
            <FormInput
              {...register("lastName", {
                required: "Artist LastName is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Only letters are allowed",
                },
              })}
              type="text"
              text="Artist LastName"
              className={classNames({ [styles.error]: errors.lastName })}
            />
            {errors.lastName && (
              <span className={styles.errorMessage}>
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.errorContainer}>
        <textarea
          {...register("biography", {
            required: "Description is required",
            maxLength: {
              value: 300,
              message: "Minimum length is 300 characters",
            },
          })}
          placeholder="About..."
          className={classNames(styles.textarea, {
            [styles.error]: errors.biography,
          })}
        />
        {errors.biography && (
          <span className={styles.errorMessage}>
            {errors.biography.message}
          </span>
        )}
      </div>

      <div className={styles.button}>
        <Button title={artist ? "Update" : "Add"} />
      </div>
    </form>
  );
};

export default ArtistForm;
