'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import MultiTaskButton from "../../MultiTaskButton/MultiTaskButton";
import AlbumPlaylistInfoCard from "../../AlbumPlaylistInfoCard/AlbumPlaylistInfoCard";
import styles from "./SongTable.module.scss";
import { songModalInterface } from "@/app/interface/songModal.interface";
import Modal from "../../Modal/Modal";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";

type songTableProps = {
  showAddButton?: boolean;
  albumId: string | null;
  searchTerm: string;
};

const SongTable = ({ showAddButton, albumId, searchTerm }: songTableProps) => {
  const [songsInAlbum, setSongsInAlbum] = useState<songModalInterface[]>([]);
  const [songsNotInAlbum, setSongsNotInAlbum] = useState<songModalInterface[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddMusicModal, setShowAddMusicModal] = useState(false);
  const [deleteMusicId, setDeleteMusicId] = useState<string | null>(null);

  useEffect(() => {
    if (albumId) {
      fetchSongsInAlbum();
      fetchSongsNotInAlbum();
    } 
  }, [albumId]);

  const fetchSongsNotInAlbum = async () => {
    try {
      const response = await axios.get(
        `https://one919-backend.onrender.com/music/notInAlbum/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      setSongsNotInAlbum(response.data);
    } catch (error) {
      alert(`Error fetching songs not in album: ${error}`);
    }
  };

  const fetchSongsInAlbum = async () => {
    try {
      const response = await axios.get(
        `https://one919-backend.onrender.com/music/inAlbum/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      setSongsInAlbum(response.data);
    } catch (error) {
      alert(`Error fetching songs in album: ${error}`);
    }
  };

  const handleAddMusic = async (musicId: string) => {
    if (albumId) {
      try {
        await axios.put(
          `https://one919-backend.onrender.com/album/addMusic/${albumId}`,
          {
            musicId: musicId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        fetchSongsInAlbum();
        fetchSongsNotInAlbum();
        setShowAddMusicModal(false);
      } catch (error) {
        alert(`Error adding music: ${error}`);
      }
    }
  };

  const handleDeleteMusic = async () => {
    if (albumId && deleteMusicId) {
      try {
        await axios.delete(
          `https://one919-backend.onrender.com/album/${albumId}/music/${deleteMusicId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        fetchSongsInAlbum();  
        fetchSongsNotInAlbum();
        handleCloseDeleteModal();
      } catch (error) {
        alert(`Error deleting music: ${error}`);
      }
    }
  };

  const handleShowDeleteModal = (musicId: string) => {
    setDeleteMusicId(musicId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteMusicId(null);
  };

  const filteredSongsNotInAlbum = songsNotInAlbum.filter(
    (music) =>
      (music.authorName &&
        music.authorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (music.name &&
        music.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSongsInAlbum = songsInAlbum.filter(
    (music) =>
      (music.authorName &&
        music.authorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (music.name &&
        music.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns = [
    {
      title: "Song Name",
      dataIndex: "songName",
      key: "songName",
      render: (text: string, record: songModalInterface) => (
        <AlbumPlaylistInfoCard
          image={record.photo.url}
          playlistName={record.name}
          artistName={record.authorName}
        />
      ),
    },
    {
      title: "",
      key: "action",
      dataIndex: "action",
      align: "center" as "center",
      render: (text: string, record: songModalInterface) => (
        <>
          {showAddButton ? (
            <MultiTaskButton
              icon={"/Icons/plus.svg"}
              onclick={() => handleAddMusic(record.id.toString())}
            />
          ) : (
            <MultiTaskButton
              icon={"/Icons/trash.svg"}
              onclick={() => handleShowDeleteModal(record.id.toString())}
            />
          )}
          {showDeleteModal && (
            <Modal setShowModal={handleCloseDeleteModal}>
              <ConfirmModal
                text={"Do you want to delete this song?"}
                onclose={handleCloseDeleteModal}
                onclick={handleDeleteMusic}
              />
            </Modal>
          )}
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={showAddButton ? filteredSongsNotInAlbum : filteredSongsInAlbum}
      pagination={false}
      showHeader={false}
      rowClassName={() => "song-row"}
      className={styles.tableContainer}
    />
  );
};

export default SongTable;
