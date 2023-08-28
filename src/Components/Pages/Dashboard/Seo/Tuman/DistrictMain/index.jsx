import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../../DashLayout";
import DistrictMainWrapper from "./style";
import { Button, IconButton, Drawer } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import AddDistrict from "../AddDistrict";
import EditDistrict from "../EditDistrict";
import DistrictProvider from "../../../../../../Data/DistrictProvider";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";

const DistrictMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tuman, setTuman] = useState([]);
  const [editTuman, setEditTuman] = useState({});
  const confirm = useConfirm();

  const handleDeleteDistrict = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await DistrictProvider.deleteDistrict(obj.id);
        setTuman((p) =>
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

  const handleEditDistrict = (obj) => {
    setIsOpenModal2(true);
    setEditTuman(obj);
  };

  useEffect(() => {
    setLoading(true);
    DistrictProvider.getAllDistrict()
      .then((res) => {
        setTuman(res.data.data);
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
      <DistrictMainWrapper>
      <div className="top">
          <h3 className="col-2">Tumanlar</h3>
          <Button
            class="col-2 btn btn-success btn-rounded"
            variant="contained"
            onClick={() => openModal()}
          >
            Tuman qo`shish
          </Button>
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ minWidth: "70%" }} className="col">
              Tuman nomi
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              tuman.map((obj, index) => (
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
                      onClick={() => handleEditDistrict(obj)}
                      >
                        <EditSvg />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteDistrict(obj)}>
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
          <AddDistrict onCloseModal={onCloseModal} />
        </Drawer>
        <Drawer
          anchor={"right"}
          open={isOpenModal2}
          onClose={() => {
            onCloseModal2();
          }}
        >
          <EditDistrict onCloseModal2={onCloseModal2} editTuman={editTuman}/>
        </Drawer>
      </DistrictMainWrapper>
    </DashboardLayout>
  );
};

export default DistrictMain;
