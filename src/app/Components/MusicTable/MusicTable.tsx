"use client";
import styles from "./MusicTable.module.scss";
import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import AlbumPlaylistInfoCard from "../AlbumPlaylistInfoCard/AlbumPlaylistInfoCard";
import MultiTaskButton from "../MultiTaskButton/MultiTaskButton";
import { musicTableInterface } from "@/app/interface/musicTable.interface";
import axios from "axios";
import MusicForm from "../FormForModal/MusicModal/MusicForm";
import Modal from "../Modal/Modal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const MusicTable = ({ searchTerm }: { searchTerm: string }) => {
  const [dataSource, setDataSource] = useState<musicTableInterface[]>([]);
  const [selectedMusic, setSelectedMusic] =
    useState<musicTableInterface | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMusicId, setSelectedMusicId] = useState<number | null>(null);

  // Fetch music data when the component mounts or data changes
  useEffect(() => {
    fetchMusics();
  }, [dataSource]);

  const fetchMusics = async () => {
    try {
      const response = await axios.get(
        "https://one919-backend.onrender.com/music",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      setDataSource(
        response.data.map((item: any) => ({ ...item, key: item.id.toString() }))
      );
    } catch (error) {
      alert(`Error fetching data:${error}`);
    }
  };

  const handleShow = (id: number) => {
    setSelectedMusicId(id);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setSelectedMusicId(null);
  };

  const openEditForm = (music: musicTableInterface) => {
    setSelectedMusic(music);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    if (selectedMusicId !== null) {
      try {
        await axios.delete(
          `https://one919-backend.onrender.com/music/${selectedMusicId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        fetchMusics(); // Refresh data after delete
        handleClose();
      } catch (error) {
        alert(`Error deleting music: ${error}`);
      }
    }
  };

  const handleEditMusic = async (updatedMusic: musicTableInterface) => {
    try {
      await axios.put(
        `https://one919-backend.onrender.com/music/${updatedMusic.id}`,
        updatedMusic,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      fetchMusics(); // Refresh data after edit
      setShowEditModal(false);
      setSelectedMusic(null);
    } catch (error) {
      alert(`Error updating music: ${error}`);
    }
  };

  const addNewMusic = async (newMusic: musicTableInterface) => {
    try {
      await axios.post("https://one919-backend.onrender.com/music", newMusic, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      fetchMusics(); // Refresh data after adding new music
      setShowEditModal(false);
    } catch (error) {
      alert(`Error adding music: ${error}`);
    }
  };

  const filteredDataSource = dataSource.filter(
    (music) =>
      (music.authorName &&
        music.authorName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (music.name &&
        music.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns = [
    {
      title: "Music Name / Author Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: musicTableInterface) => (
        <AlbumPlaylistInfoCard
          image={record.photo.url}
          playlistName={record.name || "Unknown music name"}
          artistName={record.authorName || "Unknown artist name"}
        />
      ),
    },
    {
      render: (text: string, record: musicTableInterface) => (
        <Space size="middle">
          <MultiTaskButton
            icon={"/Icons/pen.svg"}
            onclick={() => openEditForm(record)}
          />
          <MultiTaskButton
            icon={"/Icons/trash.svg"}
            onclick={() => handleShow(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredDataSource}
        pagination={false}
        rowKey="key"
        bordered
        className={styles.tableContainer}
      />
      {showDeleteModal && (
        <Modal setShowModal={setShowDeleteModal}>
          <ConfirmModal
            text={"Do you want to delete the music?"}
            onclose={handleClose}
            onclick={handleDelete}
          />
        </Modal>
      )}

      {showEditModal && (
        <Modal setShowModal={setShowEditModal}>
          <MusicForm
            setShowModal={setShowEditModal}
            music={selectedMusic || undefined}
            updateMusic={handleEditMusic}
            addNewMusic={addNewMusic}
          />
        </Modal>
      )}
    </>
  );
};

export default MusicTable;
