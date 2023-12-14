import React, { useEffect, useState } from "react";
import AnalizMainWrapper from "./style";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import BacteriaMainWrapper from "./style";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";
import AddBacteria from "../AddBacteria";
import UpdateBacteria from "../UpdateBacteria";

const BacteriaMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bacteria, setBacteria] = useState([]);
  const [editBacteria, setEditBacteria] = useState({});
  const confirm = useConfirm();

  const handleDeleteBacteria = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await BacteriaProvider.deleteBacteria(obj.id);
        setBacteria((p) =>
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

  const handleEditBacteria = (obj) => {
    setIsOpenModal2(true);
    setEditBacteria(obj);
  };

  useEffect(() => {
    setLoading(true);
    BacteriaProvider.getAllBacteria()
      .then((res) => {
        setBacteria(res.data.data);
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
    <BacteriaMainWrapper>
      <div className="top">
        <h3 className="col-2">Bakteriyalar</h3>
        <Button
          class="col-2 btn btn-primary btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Bakteriya qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "35%" }} className="col">
              Bakteriya nomi
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
            bacteria.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "35%" }} className="col">
                  {index + 1}. {obj.bacteria_name}
                </td>
                <td style={{ minWidth: "35%" }} className="col">
                   {obj.laboratory?.name}
                </td>
                <td style={{ minWidth: "30%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton onClick={() => handleEditBacteria(obj)}>
                      <EditSvg />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteBacteria(obj)}>
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
        <AddBacteria onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateBacteria onCloseModal2={onCloseModal2} editBacteria={editBacteria} />
      </Drawer>
    </BacteriaMainWrapper>
  );
};

export default BacteriaMain;
