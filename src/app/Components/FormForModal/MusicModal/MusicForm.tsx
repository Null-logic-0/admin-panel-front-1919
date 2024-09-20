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
import Spinner from "../../LoadingSpiner/Spiner";

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
      }
    };
    fetchArtists();

    if (music) {
      setValue("musicName", music.name);
      setValue("authorName", music.authorName);
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
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("name", data.musicName || "");
    formData.append("authorName", data.authorName || ""); 

    const token = localStorage.getItem("accesstoken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    setLoading(true);
    const request = music
      ? axios.put(
          `https://one919-backend-1.onrender.com/music/${music.id}`,
          formData,
          { headers }
        )
      : axios.post("https://one919-backend-1.onrender.com/music", formData, {
          headers,
        });

    request
      .then((response) => {
        const newMusic: musicTableInterface = {
          id: response.data.id,
          key: response.data.id.toString(),
          name: response.data.musicName,
          authorName: response.data.authorName,
          photo: response.data.files,
          music: response.data.files,
        };
        music ? updateMusic?.(newMusic) : addNewMusic?.(newMusic);
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
      <div className={styles.container}>
        <div className={styles.inputs}>
          <FormInput
            className={classNames({ [styles.error]: errors.musicName })}
            {...register("musicName", {
              required: "Music Name is required",
              maxLength: { value: 30, message: "Max length is 30 characters" },
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
          <select
            id="authorName"
            className={classNames({ [styles.error]: errors.artistName } ,styles.select)}
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
        <Button
          title={loading ? "Saving..." : music ? "Update" : "Add"}
          disabled={loading}
        />
      </div>
      {loading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
    </form>
  );
};

export default MusicForm;
