import React, { useEffect, useState } from "react";
import AnalizMainWrapper from "./style";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import ParasiteProvider from "../../../../../../Data/ParasiteProvider";
import AddParasite from "../AddParasite";
import UpdateParasite from "../UpdateParasite";
import ParasiteMainWrapper from "./style";

const ParasiteMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parasite, setParasite] = useState([]);
  const [editParasite, setEditParasite] = useState({});
  const confirm = useConfirm();

  const handleDeleteParasite = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await ParasiteProvider.deleteParasite(obj.id);
        setParasite((p) =>
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

  const handleEditParasite = (obj) => {
    setIsOpenModal2(true);
    setEditParasite(obj);
  };

  useEffect(() => {
    setLoading(true);
    ParasiteProvider.getAllParasite()
      .then((res) => {
        setParasite(res.data.data);
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
    <ParasiteMainWrapper>
      <div className="top">
        <h3 className="col-2">Parazitlar</h3>
        <Button
          class="col-2 btn btn-success btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Parazit qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "35%" }} className="col">
              Parazit nomi
            </th>
            <th style={{ minWidth: "35%" }} className="col">
              Labaratory nomi
            </th>
            <th style={{ minWidth: "30%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            parasite.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "35%" }} className="col">
                  {index + 1}. {obj.parasite_name}
                </td>
                <td style={{ minWidth: "35%" }} className="col">
                   {obj.laboratory?.name}
                </td>
                <td style={{ minWidth: "30%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton onClick={() => handleEditParasite(obj)}>
                      <EditSvg />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteParasite(obj)}>
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
        <AddParasite onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateParasite onCloseModal2={onCloseModal2} editParasite={editParasite} />
      </Drawer>
    </ParasiteMainWrapper>
  );
};

export default ParasiteMain;
