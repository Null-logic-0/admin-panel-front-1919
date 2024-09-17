"use client";
import { useState } from "react";
import MultiTaskButton from "../MultiTaskButton/MultiTaskButton";
import Search from "../Search/Search";
import styles from "./Music.module.scss";
import { musicTableInterface } from "@/app/interface/musicTable.interface";
import MusicTable from "../MusicTable/MusicTable";
import Modal from "../Modal/Modal";
import MusicForm from "../FormForModal/MusicModal/MusicForm";
import axios from "axios";

const initialDataSource: musicTableInterface[] = [];

const Music = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] =
    useState<musicTableInterface[]>(initialDataSource);

  const openMusicForm = () => {
    setShowModal(!showModal);
  };

  const addNewMusic = (newMusic: musicTableInterface) => {
    setDataSource((prevDataSource) => [...prevDataSource, newMusic]);
  };

  const updateMuisc = (updatedMusic: musicTableInterface) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((artist) =>
        artist.id === updatedMusic.id ? updatedMusic : artist
      )
    );
  };

  const handleSearch = () => {
    axios
      .get(`https://one919-backend.onrender.com/search/q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
      });
  };

  return (
    <>
      <div className={styles.container}>
        <MultiTaskButton
          icon={"/Icons/addSongs.svg"}
          title="Add Songs"
          onclick={openMusicForm}
        />
        <Search
          placeHolder="Search for Music"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      <MusicTable searchTerm={searchTerm} />

      {showModal && (
        <Modal setShowModal={openMusicForm}>
          <MusicForm
            setShowModal={openMusicForm}
            addNewMusic={addNewMusic}
            updateMusic={updateMuisc}
          />
        </Modal>
      )}
    </>
  );
};

export default Music;
