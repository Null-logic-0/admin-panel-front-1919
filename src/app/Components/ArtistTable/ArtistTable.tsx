import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import styles from "./ArtistTable.module.scss";
import ArtistUserInfoCard from "../ArtistUserInfoCard/ArtistUserInfoCard";
import MultiTaskButton from "../MultiTaskButton/MultiTaskButton";
import { ArtistTableInterFace } from "@/app/interface/artistTable.interface";
import axios from "axios";
import Modal from "../Modal/Modal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import ArtistForm from "../FormForModal/ArtistForm";

const ArtistTable = ({ searchTerm }: { searchTerm: string }) => {
  const [dataSource, setDataSource] = useState<ArtistTableInterFace[]>([]);
  const [selectedArtist, setSelectedArtist] =
    useState<ArtistTableInterFace | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get(
        "https://one919-backend.onrender.com/author",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShow = (id: number) => {
    setSelectedArtistId(id);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setSelectedArtistId(null);
  };

  const openEditForm = (artist: ArtistTableInterFace) => {
    setSelectedArtist(artist);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    if (selectedArtistId !== null) {
      try {
        await axios.delete(
          `https://one919-backend.onrender.com/author/${selectedArtistId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        fetchArtists();
        handleClose();
      } catch (error) {
        console.error("Error deleting artist:", error);
      }
    }
  };

  const handleEditArtist = async (updatedArtist: ArtistTableInterFace) => {
    try {
      await axios.put(
        `https://one919-backend.onrender.com/author/${updatedArtist.id}`,
        updatedArtist,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      fetchArtists();
      setShowEditModal(false);
      setSelectedArtist(null);
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  };

  const addNewArtist = async (newArtist: ArtistTableInterFace) => {
    try {
      const response = await axios.post(
        "https://one919-backend.onrender.com/author",
        newArtist,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );

      setDataSource((prevDataSource) => [...prevDataSource, response.data]);

      setShowEditModal(false);
    } catch (error) {
      console.error("Error adding artist:", error);
    }
  };

  const filteredDataSource = dataSource.filter(
    (artist) =>
      artist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Name/Image",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: ArtistTableInterFace) => (
        <ArtistUserInfoCard
          image={record.photo.url}
          firstName={record.firstName}
          lastName={record.lastName}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: ArtistTableInterFace) => (
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
        dataSource={filteredDataSource}
        columns={columns}
        pagination={false}
        rowKey="id"
        className={styles.tableContainer}
      />

      {showDeleteModal && (
        <Modal setShowModal={setShowDeleteModal}>
          <ConfirmModal
            text={"Do you want to delete the artist?"}
            onclose={handleClose}
            onclick={handleDelete}
          />
        </Modal>
      )}

      {showEditModal && (
        <Modal setShowModal={setShowEditModal}>
          <ArtistForm
            setShowModal={setShowEditModal}
            artist={selectedArtist || undefined}
            updateArtist={handleEditArtist}
            addNewArtist={addNewArtist}
          />
        </Modal>
      )}
    </>
  );
};

export default ArtistTable;
