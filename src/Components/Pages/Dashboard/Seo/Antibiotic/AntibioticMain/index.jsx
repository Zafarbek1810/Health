import React, { useEffect, useState } from "react";
import LabaratoryMainWrapper from "./style";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import AntibioticProvider from "../../../../../../Data/AntibioticProvider";
import AddAntibiotic from "../AddAntibiotic";
import UpdateAntibiotic from "../UpdateAntibiotic";

const AntibioticMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [antibiotic, setAntibiotic] = useState([]);
  const [editAntibiotic, setEditAntibiotic] = useState({});
  const confirm = useConfirm();

  const handleDeleteAntibiotic = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await AntibioticProvider.deleteAntibiotic(obj.id);
        setAntibiotic((p) =>
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

  const handleEditAntibiotic = (obj) => {
    setIsOpenModal2(true);
    setEditAntibiotic(obj);
  };

  useEffect(() => {
    setLoading(true);
    AntibioticProvider.getAllAntibiotic()
      .then((res) => {
        setAntibiotic(res.data.data);
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
      <LabaratoryMainWrapper>
      <div className="top">
          <h3 className="col-2">Antibiotiklar</h3>

          <Button
            class="col-2 btn btn-primary btn-rounded"
            variant="contained"
            onClick={() => openModal()}
          >
            Antibiotik qo`shish
          </Button>
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ minWidth: "70%" }} className="col">
              Antibiotik nomi
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              antibiotic.map((obj, index) => (
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
                      onClick={() => handleEditAntibiotic(obj)}
                      >
                        <EditSvg />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteAntibiotic(obj)}>
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
          <AddAntibiotic onCloseModal={onCloseModal} />
        </Drawer>
        <Drawer
          anchor={"right"}
          open={isOpenModal2}
          onClose={() => {
            onCloseModal2();
          }}
        >
          <UpdateAntibiotic onCloseModal2={onCloseModal2} editAntibiotic={editAntibiotic}/>
        </Drawer>
      </LabaratoryMainWrapper>
  );
};

export default AntibioticMain;
