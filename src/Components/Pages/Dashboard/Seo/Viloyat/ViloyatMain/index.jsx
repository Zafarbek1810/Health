import React, { useEffect, useState } from "react";
import ViloyatMainWrapper from "./style";
import DashboardLayout from "../../../../../DashLayout";
import { Button, Drawer, IconButton } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import AddViloyat from "../AddViloyat";
import RegionProvider from "../../../../../../Data/RegionProvider";
import EditViloyat from "../EditViloyat";

const ViloyatMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viloyat, setViloyat] = useState([]);
  const [editViloyat, setEditViloyat] = useState({});
  const confirm = useConfirm();

  const handleDeleteRegion = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await RegionProvider.deleteRegion(obj.id);
        setViloyat((p) =>
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

  const handleEditViloyat = (obj) => {
    setIsOpenModal2(true);
    setEditViloyat(obj);
  };

  useEffect(() => {
    setLoading(true);
    RegionProvider.getAllRegion()
      .then((res) => {
        setViloyat(res.data.data);
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
      <ViloyatMainWrapper>
        <div className="top">
          <h3 className="col-2">Viloyatlar</h3>

          <Button
            class="col-2 btn btn-primary btn-rounded"
            variant="contained"
            onClick={() => openModal()}
          >
            Viloyat qo`shish
          </Button>
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ minWidth: "70%" }} className="col">
                Viloyat nomi
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              viloyat.map((obj, index) => (
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
                      <IconButton onClick={() => handleDeleteRegion(obj)}>
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
          <AddViloyat onCloseModal={onCloseModal} />
        </Drawer>
        <Drawer
          anchor={"right"}
          open={isOpenModal2}
          onClose={() => {
            onCloseModal2();
          }}
        >
          <EditViloyat onCloseModal2={onCloseModal2} editViloyat={editViloyat}/>
        </Drawer>
      </ViloyatMainWrapper>
    </DashboardLayout>
  );
};

export default ViloyatMain;
