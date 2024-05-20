import React, { useEffect, useState } from "react";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import VirusMainWrapper from "./style";
import AddMicroorganism from "../AddMicroorganism";
import UpdateMicroorganism from "../UpdateMicroorganism";
import MicroOrganismProvider from "../../../../../../Data/MicroOrganismProvider";

const MicroorganismMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [microorganism, setMicroorganism] = useState([]);
  const [editMicroorganism, setEditMicroorganism] = useState({});
  const confirm = useConfirm();

  const handleDeleteMicro = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await MicroOrganismProvider.deleteMicroorganism(obj.id);
        setMicroorganism((p) =>
          p.filter((reg) => {
            return reg.id !== obj.id;
          })
        );
        toast.success("O'chirildi!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditMicro = (obj) => {
    setIsOpenModal2(true);
    setEditMicroorganism(obj);
  };

  useEffect(() => {
    setLoading(true);
    MicroOrganismProvider.getAllMicroorganism()
      .then((res) => {
        setMicroorganism(res.data.data);
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
    <VirusMainWrapper>
      <div className="top">
        <h3 className="col-2">Mikroorganizmlar</h3>
        <Button
          class="col-2 btn btn-primary btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Mikroorganizm qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "35%" }} className="col">
            Mikroorganizm nomi
            </th>
            <th style={{ minWidth: "30%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            microorganism.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "35%" }} className="col">
                  {index + 1}. {obj.name}
                </td>
                <td style={{ minWidth: "30%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton onClick={() => handleEditMicro(obj)}>
                      <EditSvg />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteMicro(obj)}>
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
        <AddMicroorganism onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateMicroorganism onCloseModal2={onCloseModal2} editMicroorganism={editMicroorganism} />
      </Drawer>
    </VirusMainWrapper>
  );
};

export default MicroorganismMain;
