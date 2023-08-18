import React, { useEffect, useState } from "react";
import CompanyMainWrapper from "./style";
import { useConfirm } from "material-ui-confirm";
import CompanyProvider from "../../../../../../Data/CompanyProvider";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import AddCompany from "../AddCompany";
import UpdateCompany from "../UpdateCompany";

const CompanyMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState([]);
  const confirm = useConfirm();
  const [editCompany, setEditCompany] = useState({});

  const handleDeleteUser = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await CompanyProvider.deleteCompany(obj.id);
        setCompany((p) =>
          p.filter((user) => {
            return user.id !== obj.id;
          })
        );
        toast.success("O'chirildi!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditCompany = (obj) => {
    console.log(obj);
    setIsOpenModal2(true);
    setEditCompany(obj);
  };

  useEffect(() => {
    setLoading(true);
    CompanyProvider.getAllCompany()
      .then((res) => {
        setCompany(res.data.data);
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
    <CompanyMainWrapper>
      <div className="top">
        <h3 className="col-2">Companylar</h3>

        <Button
          class="col-2 btn btn-success btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Company qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "70%" }} className="col">
              Company nomi
            </th>
            <th style={{ minWidth: "30%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            company.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "70%" }} className="col">
                  {index + 1}. {obj.name}
                </td>
                <td style={{ minWidth: "30%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton
                    onClick={() => handleEditCompany(obj)}
                    >
                      <EditSvg />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(obj)}>
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
        <AddCompany onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateCompany onCloseModal2={onCloseModal2} editCompany={editCompany} />
      </Drawer>
    </CompanyMainWrapper>
  );
};

export default CompanyMain;
