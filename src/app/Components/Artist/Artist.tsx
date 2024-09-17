"use client";
import { useState } from "react";
import ArtistTable from "../ArtistTable/ArtistTable";
import MultiTaskButton from "../MultiTaskButton/MultiTaskButton";
import Search from "../Search/Search";
import styles from "./Artist.module.scss";
import Modal from "../Modal/Modal";
import ArtistForm from "../FormForModal/ArtistForm";
import { ArtistTableInterFace } from "@/app/interface/artistTable.interface";
import axios from "axios";

const initialDataSource: ArtistTableInterFace[] = [];

const Artist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] =
    useState<ArtistTableInterFace[]>(initialDataSource);

  const openArtistForm = () => {
    setShowModal(!showModal);
  };

  const addNewArtist = (newArtist: ArtistTableInterFace) => {
    setDataSource((prevDataSource) => [...prevDataSource, newArtist]);
  };

  const updateArtist = (updatedArtist: ArtistTableInterFace) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((artist) =>
        artist.id === updatedArtist.id ? updatedArtist : artist
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
      
  };

  return (
    <>
      <div className={styles.container}>
        <MultiTaskButton
          icon={"/Icons/melody.svg"}
          title="Add Artist"
          onclick={openArtistForm}
        />
        <Search
          placeHolder="Search for Artist"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      <ArtistTable searchTerm={searchTerm} />

      {showModal && (
        <Modal setShowModal={openArtistForm}>
          <ArtistForm
            setShowModal={openArtistForm}
            addNewArtist={addNewArtist}
            updateArtist={updateArtist}
          />
        </Modal>
      )}
    </>
  );
};

export default Artist;
