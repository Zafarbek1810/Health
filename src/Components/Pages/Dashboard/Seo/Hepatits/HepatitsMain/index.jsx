import React, { useEffect, useState } from "react";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import VirusMainWrapper from "./style";
import HepatitProvider from "../../../../../../Data/HepatitProvider";
import AddHepatit from "../AddHepatits";
import UpdateHepatit from "../UpdateHepatits";

const HepatitsMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hepatit, setHepatit] = useState([]);
  const [editHepatit, setEditHepatit] = useState({});
  const confirm = useConfirm();

  const handleDeleteHepatit = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await HepatitProvider.deleteHepatits(obj.id);
        setHepatit((p) =>
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

  const handleEditHepatit = (obj) => {
    setIsOpenModal2(true);
    setEditHepatit(obj);
  };

  useEffect(() => {
    setLoading(true);
    HepatitProvider.getAllHepatits()
      .then((res) => {
        setHepatit(res.data.data);
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
        <h3 className="col-2">Gepatitlar</h3>
        <Button
          class="col-2 btn btn-primary btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Gepatit qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "25%" }} className="col">
            Gepatit nomi
            </th>
            <th style={{ minWidth: "25%" }} className="col">
            Gepatit tipi
            </th>
            <th style={{ minWidth: "25%" }} className="col">
              Labaratory nomi
            </th>
            <th style={{ minWidth: "25%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            hepatit.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "25%" }} className="col">
                  {index + 1}. {obj.name}
                </td>
                <td style={{ minWidth: "25%" }} className="col">
                 {obj.type}
                </td>
                <td style={{ minWidth: "25%" }} className="col">
                   {obj.laboratory?.name}
                </td>
                <td style={{ minWidth: "25%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton onClick={() => handleEditHepatit(obj)}>
                      <EditSvg />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteHepatit(obj)}>
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
        <AddHepatit onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateHepatit onCloseModal2={onCloseModal2} editHepatit={editHepatit} />
      </Drawer>
    </VirusMainWrapper>
  );
};

export default HepatitsMain;
