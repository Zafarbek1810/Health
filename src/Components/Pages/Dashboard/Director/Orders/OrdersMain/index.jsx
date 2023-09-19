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
import { Dropdown, Menu } from "antd";

const OrdersMainDirector = () => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const confirm = useConfirm();
  const [modalAnalizData, setModalAnalizData] = useState([]); // modal analiz data
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [order, setOrder] = useState([]);
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [forRender, setForRender] = useState(null);

  useEffect(() => {
    setLoading(true);
    OrderProvider.getAllOrders(1, 20000)
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

  }, [forRender]);

  const handleTableRow = (obj) => {
    setLoadingModal(true);
    OrderProvider.getOrdersById(obj.id)
      .then((res) => {
        setModalAnalizData(res.data.data.orderDetailDTOS);
        console.log(res.data.data.orderDetailDTOS);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingModal(false);
      });
  };

  const confirmOrder = (obj) => {
      confirm({
        title: "Rostan ham tasdiqlaysizmi?",
        confirmationText: "Ha",
        cancellationText: "Yo'q",
      })
        .then(async () => {
          await OrderProvider.orderConfirm(obj.id);
           setForRender(Math.random())
          toast.success("Tasdiqlandi!");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.reason);
        })
  }
  const cancelOrder = (obj) => {
      confirm({
        title: "Rostan ham bekor qilasizmi?",
        confirmationText: "Ha",
        cancellationText: "Yo'q",
      })
        .then(async () => {
          await OrderProvider.orderCancel(obj.id);
           setForRender(Math.random())
          toast.success("Bekor qilindi!");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.reason);
        })
  }
  const rejectOrder = (obj) => {
      confirm({
        title: "Rostan ham rad etasizmi?",
        confirmationText: "Ha",
        cancellationText: "Yo'q",
      })
        .then(async () => {
          await OrderProvider.orderReject(obj.id);
           setForRender(Math.random())
          toast.success("Rad etildi!");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.reason);
        })
  }

  return (
    <>
      <OrdersMainWrapper>
        <div className="top">
          <h3>Buyurtmalar</h3>
        </div>
        <table className="table table-bordered table-hover">
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
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              order.map((obj, index) => (
                <Dropdown
                key={index}
                overlay={
                  <Menu>
                    <Menu.Item key="1">
                      <Button 
                      onClick={() => confirmOrder(obj)}
                      >
                        Tasdiqlash
                      </Button>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Button onClick={() => rejectOrder(obj)}>Rad etish</Button>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Button onClick={() => cancelOrder(obj)}>Bekor qilish</Button>
                    </Menu.Item>
                  </Menu>
                }
                trigger={["contextMenu"]}
              >
                <tr key={index}>
                  <td
                    onClick={() => {
                      handleTableRow(obj);
                    }}
                    style={
                      obj.confirm === "0"
                        ? { backgroundColor: "rgb(240, 146, 146)" }
                        : obj.confirm === "1"
                        ? { backgroundColor: "rgb(185, 240, 146)" }
                        : { backgroundColor: "rgb(240, 206, 146)" }
                    }
                    className="col"
                  >
                    {index + 1}.{obj.firstName} {obj.lastName}
                  </td>
                  <td
                    onClick={() => {
                      handleTableRow(obj);
                    }}
                    style={
                      obj.confirm === "0"
                        ? { backgroundColor: "rgb(240, 146, 146)" }
                        : obj.confirm === "1"
                        ? { backgroundColor: "rgb(185, 240, 146)" }
                        : { backgroundColor: "rgb(240, 206, 146)" }
                    }
                    className="col"
                  >
                    {obj.phoneNumber}
                  </td>
                  <td
                    onClick={() => {
                      handleTableRow(obj);
                    }}
                    style={
                      obj.confirm === "0"
                        ? { backgroundColor: "rgb(240, 146, 146)" }
                        : obj.confirm === "1"
                        ? { backgroundColor: "rgb(185, 240, 146)" }
                        : { backgroundColor: "rgb(240, 206, 146)" }
                    }
                    className="col"
                  >
                    {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
                  </td>
                  <td className="col"
                  style={
                      obj.confirm === "0"
                        ? { backgroundColor: "rgb(240, 146, 146)" }
                        : obj.confirm === "1"
                        ? { backgroundColor: "rgb(185, 240, 146)" }
                        : { backgroundColor: "rgb(240, 206, 146)" }
                    }>
                    {obj.approvedAt === null
                      ? ""
                      : moment(new Date(obj.approvedAt)).format(
                          "DD.MM.YYYY HH:mm"
                        )}
                  </td>
                </tr>
              </Dropdown>
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
