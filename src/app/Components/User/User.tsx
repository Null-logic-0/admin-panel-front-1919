"use client";
import { UserTableInterFace } from "@/app/interface/UserTable.interface";
import Search from "../Search/Search";
import UserTable from "../UserTable/UserTable";
import styles from "./User.module.scss";
import { useEffect, useState } from "react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Modal from "../Modal/Modal";
import PasswordForm from "../FormForModal/PasswordForm/PasswordForm";
import { dropDownOptions } from "@/app/interface/dropdown.interface";
import axios from "axios";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSource, setDataSource] = useState<UserTableInterFace[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [passwordChangeUserId, setPasswordChangeUserId] = useState<number | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://one919-backend.onrender.com/search/q=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      setDataSource(response.data);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const handleBlockUser = async () => {
    if (selectedUserId) {
      try {
        await axios.put(
          `https://one919-backend.onrender.com/auth/block/${selectedUserId}`,
          { isBlocked: true },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        await fetchUsers();
        closeBlockModal();
      } catch (error) {
        console.error("Error blocking user:", error);
      }
    }
  };

  const handleChangePassword = async (newPassword: string) => {
    if (passwordChangeUserId) {
      try {
        await axios.put(
          `https://one919-backend.onrender.com/auth/change-password/${passwordChangeUserId}`,
          { newPassword },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        closeChangePassword();
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  };

  const openBlockModal = (userId: number) => {
    setSelectedUserId(userId);
    setShowBlockModal(true);
  };

  const closeBlockModal = () => {
    setSelectedUserId(null);
    setShowBlockModal(false);
  };

  const openChangePassword = (userId: number) => {
    setPasswordChangeUserId(userId);
    setShowPasswordModal(true);
  };

  const closeChangePassword = () => {
    setPasswordChangeUserId(null);
    setShowPasswordModal(false);
  };

  const dropdownOptions = (userId: number): dropDownOptions[] => [
    {
      icon: "/Icons/block.svg",
      title: "Block User",
      onclick: () => openBlockModal(userId),
      id: 1,
    },
    {
      icon: "/Icons/Edit.svg",
      title: "Change Password",
      onclick: () => openChangePassword(userId),
      id: 2,
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <Search
          placeHolder="Search for User"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      <UserTable
        dropdownOptions={dropdownOptions}
        searchTerm={searchTerm}
        openBlockModal={openBlockModal}
      />
      {showBlockModal && (
        <Modal setShowModal={closeBlockModal}>
          <ConfirmModal
            text="Do you want to block this user?"
            onclose={closeBlockModal}
            onclick={handleBlockUser}
          />
        </Modal>
      )}
      {showPasswordModal && (
        <Modal setShowModal={closeChangePassword}>
          <PasswordForm
            setShowModal={closeChangePassword}
            handleChangePassword={handleChangePassword}
          />
        </Modal>
      )}
    </>
  );
};

export default User;
