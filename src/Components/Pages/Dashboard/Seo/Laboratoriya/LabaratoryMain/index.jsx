import React, { useEffect, useState } from "react";
import LabaratoryMainWrapper from "./style";
import DashboardLayout from "../../../../../DashLayout";
import { useConfirm } from "material-ui-confirm";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import AddLabaratory from "../AddLabaratory";
import UpdateLabaratory from "../UpdateLabaratory";

const LabaratoryMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [laboratory, setLaboratory] = useState([]);
  const [editLaboratory, setEditLaboratory] = useState({});
  const confirm = useConfirm();

  const handleDeleteLaboratory = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await LabaratoryProvider.deleteLaboratory(obj.id);
        setLaboratory((p) =>
          p.filter((lab) => {
            return lab.id !== obj.id;
          })
        );
        toast.success("O'chirildi!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditViloyat = (obj) => {
    setIsOpenModal2(true);
    setEditLaboratory(obj);
  };

  useEffect(() => {
    setLoading(true);
    LabaratoryProvider.getAllLaboratory()
      .then((res) => {
        setLaboratory(res.data.data);
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
    <DashboardLayout>
      <LabaratoryMainWrapper>
      <div className="top">
          <h3 className="col-2">Laboratoriyalar</h3>

          <Button
            class="col-2 btn btn-success btn-rounded"
            variant="contained"
            onClick={() => openModal()}
          >
            Laboratoriya qo`shish
          </Button>
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ minWidth: "70%" }} className="col">
              Laboratoriya nomi
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              laboratory.map((obj, index) => (
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
                      onClick={() => handleEditViloyat(obj)}
                      >
                        <EditSvg />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteLaboratory(obj)}>
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
          <AddLabaratory onCloseModal={onCloseModal} />
        </Drawer>
        <Drawer
          anchor={"right"}
          open={isOpenModal2}
          onClose={() => {
            onCloseModal2();
          }}
        >
          <UpdateLabaratory onCloseModal2={onCloseModal2} editLaboratory={editLaboratory}/>
        </Drawer>
      </LabaratoryMainWrapper>
    </DashboardLayout>
  );
};

export default LabaratoryMain;
