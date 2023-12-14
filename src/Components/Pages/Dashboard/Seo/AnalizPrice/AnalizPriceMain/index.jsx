import React, { useEffect, useState } from "react";
import AnalizMainWrapper from "./style";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import AnalizPriceProvider from "../../../../../../Data/AnalizPriceProvider";
import AddAnalizPrice from "../AddAnalizPrice";
import UpdateAnalizPrice from "../UpdateAnalizPrice";

const AnalizPriceMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analizPrice, setAnalizPrice] = useState([]);
  const [editAnalizPrice, setEditAnalizPrice] = useState({});
  const confirm = useConfirm();

  const handleDeleteAnalizPrice = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await AnalizPriceProvider.deleteAnalysisPrice(obj.id);
        setAnalizPrice((p) =>
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

  const handleEditAnalizPrice = (obj) => {
    setIsOpenModal2(true);
    setEditAnalizPrice(obj);
  };

  useEffect(() => {
    setLoading(true);
    AnalizPriceProvider.getAllAnalysisPrice(1, 10000)
      .then((res) => {
        setAnalizPrice(res.data.data);
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
    <AnalizMainWrapper>
      <div className="top">
        <h3 className="col-2">Analiz narxlari</h3>
        <Button
          class="col-2 btn btn-primary btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Analiz narxini qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "30%" }} className="col">
              Company nomi
            </th>
            <th style={{ minWidth: "40%" }} className="col">
              Analiz nomi
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Narxi
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            analizPrice.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "30%" }} className="col">
                  {index + 1}. {obj.companyName}
                </td>
                <td style={{ minWidth: "40%" }} className="col">
                  {obj.analysisName}
                </td>
                <td style={{ minWidth: "10%", fontWeight:600 }} className="col">
                  {obj.price.toLocaleString().replace(/,/g, " ")}
                </td>
                <td style={{ minWidth: "20%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton onClick={() => handleEditAnalizPrice(obj)}>
                      <EditSvg />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteAnalizPrice(obj)}>
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
        <AddAnalizPrice onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateAnalizPrice onCloseModal2={onCloseModal2} editAnalizPrice={editAnalizPrice} />
      </Drawer>
    </AnalizMainWrapper>
  );
};

export default AnalizPriceMain;
