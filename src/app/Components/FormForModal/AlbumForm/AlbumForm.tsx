"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import styles from "./AlbumForm.module.scss";
import { FormDataInterface } from "@/app/interface/FormForModal.interface";
import Button from "../../Button/Button";
import FormInput from "../FormInput/FormInput";
import { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import { albumTableInterface } from "@/app/interface/albumTable.interface";
import Spinner from "../../LoadingSpiner/Spiner";

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

  const [image, setImage] = useState<File | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const token = localStorage.getItem("accesstoken");

      try {
        const response = await axios.get(
          "https://one919-backend-1.onrender.com/author",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formattedArtists = response.data.map((artist: any) => ({
          id: artist.id,
          name: `${artist.firstName} ${artist.lastName}`,
        }));
        setArtists(formattedArtists);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };
    fetchArtists();

    if (album) {
      setValue("title", album.title);
      setValue("authorName", album.authorName);
      if (album.photo) setImageUploaded(true);
    } else {
      reset();
    }
  }, [album, setValue, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert("File is too large. Maximum allowed size is 5 MB.");
        return;
      }
      setImage(file);
      setImageUploaded(true);
    }
  };

  const onSubmit: SubmitHandler<FormDataInterface> = (data) => {
    const formData = new FormData();
    if (image) {
      formData.append("file", image);
    }
    formData.append("title", data.title || "");
    formData.append("authorName", data.authorName || "");

    const token = localStorage.getItem("accesstoken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    setLoading(true);
    const request = album
      ? axios.put(
          `https://one919-backend-1.onrender.com/album/${album.id}`,
          formData,
          { headers }
        )
      : axios.post("https://one919-backend-1.onrender.com/album", formData, {
          headers,
        });

    request
      .then((response) => {
        const newAlbum: albumTableInterface = {
          id: response.data.id,
          key: response.data.id.toString(),
          title: response.data.title,
          authorName: response.data.authorName,
          photo: response.data.photo,
        };
        album ? updateAlbum?.(newAlbum) : addNewAlbum?.(newAlbum);
        setShowModal(false);
      })
      .catch((error) => {
        alert(`An error occurred: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <FormInput
            className={classNames({ [styles.error]: errors.title })}
            {...register("title", {
              required: "Album Name is required",
              maxLength: { value: 30, message: "Max length is 30 characters" },
            })}
            type="text"
            text="Album Name"
          />
          {errors.title && (
            <span className={styles.errorMessage}>
              {errors.title.message}
            </span>
          )}
        </div>
        <div className={styles.inputs}>
          <select
            id="authorName"
            className={classNames(
              { [styles.error]: errors.artistName },
              styles.select
            )}
            {...register("authorName", {
              required: "Artist Name is required",
            })}
          >
            <option value="" className={styles.option}>
              Select an artist
            </option>
            {artists.map((artist) => (
              <option
                key={artist.id}
                value={artist.name}
                className={styles.options}
              >
                {artist.name}
              </option>
            ))}
          </select>
          {errors.artistName && (
            <span className={styles.errorMessage}>
              {errors.artistName.message}
            </span>
          )}
        </div>

        <div className={styles.button}>
        <Button
          title={loading ? "Saving..." : album ? "Update" : "Add"}
          disabled={loading}
        />
      </div>
        
      </div>

     
      {loading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
    </form>
  );
};

export default AlbumForm;
