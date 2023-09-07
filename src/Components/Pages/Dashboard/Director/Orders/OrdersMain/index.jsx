import React, { useEffect, useRef, useState } from "react";
import OrdersMainWrapper from "./style";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import OrderProvider from "../../../../../../Data/OrderProvider";
import { toast } from "react-toastify";
import { Button, IconButton } from "@mui/material";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import ConfirmModal from "../../../../../Common/ConfirmModal";
import moment from "moment/moment";

const OrdersMainDirector = () => {
    const { register, handleSubmit, control, reset, setValue } = useForm();
  const router = useRouter();
  const confirm = useConfirm();
  const [patient, setPatient] = useState([]);
  const [modalAnalizData, setModalAnalizData] = useState([]); // modal analiz data
  const [patientId, setPatientId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [order, setOrder] = useState([]);
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);


  useEffect(() => {
    setLoading(true);
    OrderProvider.getAllOrders()
      .then((res) => {
        console.log(res.data.data);
        setOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteOrder = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await OrderProvider.deleteOrder(obj.id);
        setOrder((p) =>
          p.filter((user) => {
            return user.id !== obj.id;
          })
        );
        toast.success("O'chirildi!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.reason);
      });
  };

  const handleTableRow = (obj) => {
    setLoadingModal(true);
    OrderProvider.getOrdersById(obj.id)
      .then((res) => {
        setModalAnalizData(res.data.data);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingModal(false);
      });
  };

  return (
    <>
      <OrdersMainWrapper>
        <div className="top">
          <h3>Buyurtmalar</h3>
        </div>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "20%" }} className="col">
                Ismi Familyasi
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Telefon
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Yaratilgan sana
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Tasdiqlangan sana
              </th>
              <th style={{ minWidth: "10%" }} className="col">
                Tasdiqlash
              </th>
              <th style={{ minWidth: "10%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              order.map((obj, index) => (
                <tr key={index}>
                  <td
                    onClick={() => {
                      handleTableRow(obj);
                    }}
                    style={{ minWidth: "20%" }}
                    className="col"
                  >
                    {index + 1}.{obj.firstName} {obj.lastName}
                  </td>
                  <td
                    onClick={() => {
                      handleTableRow(obj);
                    }}
                    style={{ minWidth: "15%" }}
                    className="col"
                  >
                    {obj.phoneNumber}
                  </td>
                  <td
                    onClick={() => {
                      handleTableRow(obj);
                    }}
                    style={{ minWidth: "15%" }}
                    className="col"
                  >
                    {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                  {obj.approvedAt ===null ? '' : moment(new Date(obj.approvedAt)).format("DD.MM.YYYY HH:mm")}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    <Button variant="contained" style={{width:"100%"}} color="primary">
                      Tasdiqlash
                    </Button>
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    <div className="btns">
                      <IconButton onClick={() => handleDeleteOrder(obj)}>
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
      </OrdersMainWrapper>
      <ModalContextProvider
        RefObj={RefObj}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      >
        <ConfirmModal>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ minWidth: "50%" }} className="col">
                  Analiz nomi
                </th>
                <th style={{ minWidth: "50%" }} className="col">
                  Narxi
                </th>
              </tr>
            </thead>
            <tbody>
              {!loadingModal ? (
                <>
                  {modalAnalizData.map((obj, index) => (
                    <tr key={index}>
                      <td style={{ minWidth: "50%" }} className="col">
                        {index + 1}.{obj.analysisName}
                      </td>
                      <td style={{ minWidth: "50%" }} className="col">
                        {obj.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ minWidth: "50%" }} className="col">
                      Jami:
                    </td>
                    <td style={{ minWidth: "50%" }} className="col">
                      {modalAnalizData.reduce((a, b) => a + b.price, 0)}
                    </td>
                  </tr>
                </>
              ) : (
                <MinLoader />
              )}
            </tbody>
          </table>
        </ConfirmModal>
      </ModalContextProvider>
    </>
  );
};

export default OrdersMainDirector;
