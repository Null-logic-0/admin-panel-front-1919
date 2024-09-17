"use client";
import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import styles from "./UserTable.module.scss";
import { UserTableInterFace } from "@/app/interface/UserTable.interface";
import MultiTaskButton from "../MultiTaskButton/MultiTaskButton";
import Dropdown from "../Dropdown/Dropdown";
import { dropDownOptions } from "@/app/interface/dropdown.interface";
import axios from "axios";
import Modal from "../Modal/Modal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

type userTableProps = {
  dropdownOptions: (userId: number) => dropDownOptions[];
  searchTerm: string;
  openBlockModal: (userId: number) => void;
};

const initialDataSource: UserTableInterFace[] = [];

const UserTable = ({ dropdownOptions, searchTerm,openBlockModal }: userTableProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [dataSource, setDataSource] =
    useState<UserTableInterFace[]>(initialDataSource);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://one919-backend.onrender.com/user",
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

  const handleShow = (id: number) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setSelectedUserId(null);
  };

  const toggleDropdown = (id: string) => {
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
          `https://one919-backend.onrender.com/user/${selectedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        fetchUsers();
        handleClose();
      } catch (error) {
      }
    }
  };

  const filteredDataSource = dataSource.filter(
    (user) =>
      user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Gmail",
      dataIndex: "email",
      key: "email",
      render: (text: string, record: UserTableInterFace) => (
        <span className={`${styles.text} ${record.blocked ? styles.blocked : ''}`}>{record.email}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: UserTableInterFace) => (
        <Space size="middle">
          <div className={styles.dropdownContainer}>
            <div className={styles.button}>
              <MultiTaskButton
                icon={"/Icons/pen.svg"}
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
    </>
  );
};

export default UserTable;
