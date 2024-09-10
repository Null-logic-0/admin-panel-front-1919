"use client";
import { useState} from "react";
import MultiTaskButton from "../MultiTaskButton/MultiTaskButton";
import Search from "../Search/Search";
import styles from "./Album.module.scss";
import Modal from "../Modal/Modal";
import AlbumForm from "../FormForModal/AlbumForm/AlbumForm";
import AlbumTable from "../AlbumTable/AlbumTable";
import { albumTableInterface } from "@/app/interface/albumTable.interface";
import axios from "axios";

const initialDataSource: albumTableInterface[] = [];

const Album = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSource, setDataSource] =
    useState<albumTableInterface[]>(initialDataSource);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<
    albumTableInterface | undefined
  >(undefined);
  const [createdAlbumId, setCreatedAlbumId] = useState<string | null>(null);

  const openAddAlbumModal = (album?: albumTableInterface) => {
    setSelectedAlbum(album);
    setShowModal((prev) => !prev);
  };

  const handleSearch = () => {
    axios
      .get(`https://one919-backend.onrender.com/search?q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
        alert(`Error searching for albums: ${error.message}`);
      });
  };

  const addNewAlbum = (newAlbum: albumTableInterface) => {
    setDataSource((prevDataSource) => [...prevDataSource, newAlbum]);
    setCreatedAlbumId(newAlbum.id.toString());
  };

  return (
    <>
      <div className={styles.container}>
        <MultiTaskButton
          icon={"/Icons/albums.svg"}
          title="Add Album"
          onclick={() => openAddAlbumModal()}
        />
        <Search
          placeHolder="Search for Album"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      <AlbumTable searchTerm={searchTerm} />

      {showModal && (
        <Modal setShowModal={() => setShowModal(false)}>
          <AlbumForm
            setShowModal={() => setShowModal(false)}
            addNewAlbum={addNewAlbum}
            album={selectedAlbum}
          />
        </Modal>
      )}
    </>
  );
};

export default Album;
