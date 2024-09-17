"use client";
import styles from "./AlbumTable.module.scss";
import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import AlbumPlaylistInfoCard from "../AlbumPlaylistInfoCard/AlbumPlaylistInfoCard";
import MultiTaskButton from "../MultiTaskButton/MultiTaskButton";
import { dropDownOptions } from "@/app/interface/dropdown.interface";
import Dropdown from "../Dropdown/Dropdown";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Modal from "../Modal/Modal";
import { albumTableInterface } from "@/app/interface/albumTable.interface";
import axios from "axios";
import SongModal from "../SongModal/SongModal";
import AlbumForm from "../FormForModal/AlbumForm/AlbumForm";

type TableProps = {
  searchTerm: string;
};

const AlbumTable = ({ searchTerm }: TableProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [dataSource, setDataSource] = useState<albumTableInterface[]>([]);
  const [showDeleteSongModal, setShowDeleteSongModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<
    albumTableInterface | undefined
  >(undefined);
  const [createdAlbumId, setCreatedAlbumId] = useState<string | null>(null);
  const [addExistMusics, setAddExistMusics] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAlbum(); 
  }, [dataSource]);

  useEffect(() => {
    if (selectedAlbum) {
      setCreatedAlbumId(selectedAlbum.id.toString());
    }
  }, [selectedAlbum]);

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(
        "https://one919-backend.onrender.com/album",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      setDataSource(response.data);
    } catch (error) {
    }
  };

  const handleShowDeleteModal = (id: number) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUserId(null);
  };

  const toggleDropdown = (id: string) => {
    setCreatedAlbumId(id);
    setDropdownVisibility((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const closeDropdown = (id: string) => {
    setDropdownVisibility((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleDelete = async () => {
    if (selectedUserId !== null) {
      try {
        await axios.delete(
          `https://one919-backend.onrender.com/album/${selectedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        fetchAlbum(); 
        handleCloseDeleteModal();
      } catch (error) {
      }
    }
  };

  const filteredDataSource = dataSource.filter(
    (music) =>
      (music.authorName &&
        music.authorName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (music.title &&
        music.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openEditAlbumModal = (id?: number) => {
    const albumToEdit = dataSource.find(album => album.id === id);
    setSelectedAlbum(albumToEdit);
    setShowModal(true);
  };

  const openAddExistMusicsModal = () => {
    if (!createdAlbumId && selectedAlbum) {
      setCreatedAlbumId(selectedAlbum.id.toString());
    }
    setAddExistMusics(true);
  };

  const columns = [
    {
      title: "Album Name",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: albumTableInterface) => (
        <AlbumPlaylistInfoCard
          image={record.photo.url}
          playlistName={record.title}
          artistName={record.authorName}
        />
      ),
    },
    {
      render: (text: string, record: albumTableInterface) => (
        <Space size="middle">
          <div className={styles.dropdownContainer}>
            <div className={styles.button}>
              <MultiTaskButton
                icon="/Icons/pen.svg"
                onclick={() => toggleDropdown(record.id.toString())}
              />
            </div>

            {dropdownVisibility[record.id.toString()] && (
              <div className={styles.dropdown}>
                <Dropdown
                  options={dropdownOptions(record.id)}
                  onOptionSelect={() => closeDropdown(record.id.toString())}
                />
              </div>
            )}
          </div>
          <MultiTaskButton
            icon="/Icons/trash.svg"
            onclick={() => handleShowDeleteModal(record.id)}
          />
        </Space>
      ),
    },
  ];

  const dropdownOptions = (id: number): dropDownOptions[] => [
    {
      icon: "/Icons/addSongs.svg",
      title: "Add Music",
      id: 1,
      onclick: () => openAddExistMusicsModal(),
    },
    {
      icon: "/Icons/penedit.svg",
      title: "Edit Album",
      id: 2,
      onclick: () => openEditAlbumModal(id),
    },
    {
      icon: "/Icons/delete.svg",
      title: "Delete Music",
      id: 3,
      onclick: () => setShowDeleteSongModal(true),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredDataSource}
        pagination={false}
        rowKey="id"
        bordered
        className={styles.tableContainer}
      />

      {showDeleteModal && (
        <Modal setShowModal={setShowDeleteModal}>
          <ConfirmModal
            text="Do you want to delete the album?"
            onclose={handleCloseDeleteModal}
            onclick={handleDelete}
          />
        </Modal>
      )}

      {showDeleteSongModal && (
        <Modal setShowModal={() => setShowDeleteSongModal(false)}>
          <SongModal
            setShowModal={() => setShowDeleteSongModal(false)}
            albumId={createdAlbumId || selectedAlbum?.id.toString() || ""}
          />
        </Modal>
      )}

      {addExistMusics && (
        <Modal setShowModal={() => setAddExistMusics(false)}>
          <SongModal
            setShowModal={() => setAddExistMusics(false)}
            albumId={createdAlbumId}
            showAddButton={true}
          />
        </Modal>
      )}

      {showModal && (
        <Modal setShowModal={() => setShowModal(false)}>
          <AlbumForm
            setShowModal={() => setShowModal(false)}
            addNewAlbum={async (newAlbum) => {
              await fetchAlbum(); 
            }}
            album={selectedAlbum}
            updateAlbum={async (updatedAlbum) => {
              await fetchAlbum(); 
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default AlbumTable;
