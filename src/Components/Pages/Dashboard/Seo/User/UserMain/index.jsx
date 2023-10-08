import React, { useEffect, useState } from "react";
import UserMainWrapper from "./style";
import { Button, Drawer, IconButton } from "@mui/material";
import AddUser from "../AddUser";
import UpdateUser from "../UpdateUser";
import UserProvider from "../../../../../../Data/UserProvider";
import MinLoader from "../../../../../Common/MinLoader";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";

const UserMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const confirm = useConfirm();
  const [editUser, setEditUser] = useState({});

  const handleDeleteUser = (obj) => {
    confirm({ title: "Rostan ham o'chirishni xohlaysizmi?", confirmationText: "Ha", cancellationText: "Yo'q" })
      .then(async () => {
        await UserProvider.deleteUser(obj.id);
        setUsers((p) =>
          p.filter((user) => {
            return user.id !== obj.id;
          })
        );
        toast.success("O'chirildi!")
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditUser = (obj) => {
    console.log(obj);
    setIsOpenModal2(true);
    setEditUser(obj);
  };


  useEffect(() => {
    setLoading(true);
    UserProvider.getAllUsers()
      .then((res) => {
        setUsers(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOpenModal, isOpenModal2]);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  const onCloseModal2 = () => {
    setIsOpenModal2(false);
  };

  return (
    <UserMainWrapper>
      <div className="top">
        <h3 className="col-2">Foydalanuvchilar</h3>

        <Button
          class="col-2 btn btn-primary btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Foydalanuvchi qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "25%" }} className="col">
             Ismi Familyasi
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Username
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Lavozimi
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Telefon
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Company
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Telegram username
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            users.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "25%" }} className="col">
                  {index + 1}. {obj.lastName} {obj.firstName}
                </td>
                <td style={{ minWidth: "15%" }} className="col">
                  {obj.username}
                </td>
                <td style={{ minWidth: "10%" }} className="col">
                  {obj.roleName==="ROLE_ADMIN" ? "Admin" : obj.roleName==="ROLE_OPERATOR" ? "Laborant" : "Kassir"}
                </td>
                <td style={{ minWidth: "15%" }} className="col">
                  {obj.phoneNumber}
                </td>
                <td style={{ minWidth: "10%" }} className="col">
                  {obj.companyName}
                </td>
                <td style={{ minWidth: "15%" }} className="col">
                  {obj.telegramUsername}
                </td>

                <td style={{ minWidth: "10%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton
                    onClick={() => handleEditUser(obj)}
                    >
                      <EditSvg />
                    </IconButton>
                    <IconButton
                    onClick={() => handleDeleteUser(obj)}
                    >
                      <DeleteSvg />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <MinLoader />
          )}
        </tbody>
      </table>
      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <AddUser onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateUser onCloseModal2={onCloseModal2} editUser={editUser} />
      </Drawer>
    </UserMainWrapper>
  );
};

export default UserMain;
