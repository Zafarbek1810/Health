import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PatientProvider from "../../../../../../Data/PatientProvider";
import OrderMainWrapper from "./style";
import { Button, IconButton } from "@mui/material";
import OrderProvider from "../../../../../../Data/OrderProvider";
import MinLoader from "../../../../../Common/MinLoader";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import EyeSvg from "../../../../../Common/Svgs/EyeSvg";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import moment from "moment";
import { Badge, Drawer } from "antd";
import ConfirmModal from "../../../../../Common/ConfirmModal";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import Select from "react-select";

const OrdersMain = () => {
  const {
    register,
    setError,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [patient, setPatient] = useState([]);
  const [modalAnalizData, setModalAnalizData] = useState([]); // modal analiz data
  const [patientId, setPatientId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [order, setOrder] = useState([]);
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [privilage, setPrivilage] = useState(null);

  useEffect(() => {
    PatientProvider.getAllPatient()
      .then((res) => {
        setPatient(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  }, []);

  const render = () => {
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
  };

  const handleEditStatus = (obj) => {
    setIsOpen2(true);
    if (obj) {
      setValue("patient", {
        value: obj.paymentStatus,
        label:
          obj.paymentStatus === 1
            ? "To`langan"
            : obj.paymentStatus === 0
            ? "To`lanmagan"
            : "Qaytarilgan",
      });
    }
    setPaymentStatus(obj.paymentStatus);
    setOrderId(obj.id);
  };

  const handleTableRow = (obj) => {
    setLoadingModal(true);
    OrderProvider.getOrdersById(obj.id)
      .then((res) => {
        setModalAnalizData(res.data.data.orderDetailDTOList);
        setPrivilage(res.data.data.privilege);
        console.log(res.data.data);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingModal(false);
      });
  };

  const optionStatus = [
    { value: "1", label: "To`langan" },
    { value: "0", label: "To`lanmagan" },
    { value: "-1", label: "Qaytarilgan" },
  ];

  const onchangeStatus = () => {
    OrderProvider.changePaymentStatus(orderId, paymentStatus)
      .then((res) => {
        toast.success(res.data.message);
        setIsOpen2(false);
        render();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik!");
      });
  };

  return (
    <>
      <OrderMainWrapper>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "15%" }} className="col">
                Ismi Familyasi
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Telefon
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Yaratilgan sana
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Buyurtma holati
              </th>
              <th style={{ minWidth: "10%" }} className="col">
                To`lov turi
              </th>
              <th style={{ minWidth: "10%" }} className="col">
                Narxi
              </th>
              <th style={{ minWidth: "10%" }} className="col">
                To`lov holati
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
                  <td style={{ minWidth: "15%" }} className="col">
                    {index + 1}.{obj.firstName} {obj.lastName}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.phoneNumber}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
                  </td>

                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.confirm === "1" ? (
                      <span style={{ color: "green" }}>Tasdiqlangan</span>
                    ) : obj.confirm === "0" ? (
                      <span style={{ color: "red" }}>Rad etilgan</span>
                    ) : (
                      <span style={{ color: "orange" }}>Tasdiqlanmagan</span>
                    )}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    {+obj.paymentType === 10
                      ? "Naqd"
                      : +obj.paymentType === 20
                      ? "Plastik"
                      : +obj.paymentType === 30
                      ? "Hisobdan o'tkazish"
                      : "Bunday to'lov turi yo'q"}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    {obj.price.toLocaleString().replace(/,/g, " ")}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    {obj.paymentStatus === 1 ? (
                      <span>
                        <Badge status="processing" className="badge_success" />{" "}
                        To`langan
                      </span>
                    ) : obj.paymentStatus === 0 ? (
                      <span>
                        <Badge status="processing" className="badge_warning" />{" "}
                        To`lanmagan
                      </span>
                    ) : (
                      <span>
                        <Badge status="processing" className="badge_danger" />{" "}
                        Qaytarilgan
                      </span>
                    )}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    <div className="btns">
                      <IconButton onClick={() => handleEditStatus(obj)}>
                        <EditSvg />
                      </IconButton>
                      <IconButton onClick={() => handleTableRow(obj)}>
                        <EyeSvg />
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
      </OrderMainWrapper>

      <Drawer
        title="Buyurtma"
        placement="right"
        closable={true}
        onClose={() => setIsOpen(false)}
        visible={modalIsOpen}
        width={700}
      >
        {modalAnalizData.map((obj, index) => (
          <div key={index}>
            <div
              className="modalWrapper"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="modalLeft" style={{ width: "85%" }}>
                <p className="title">{obj.analysisName}</p>
              </div>
              <div className="modalRight" style={{ width: "15%" }}>
                <p className="title">Narxi: {obj.price}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <hr />

        <div
          className="bottom"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="bottomLeft">
            <p className="title" style={{ fontSize: 30 }}>
              Chegirma miqdori % da
            </p>
          </div>
          <div className="bottomRight">
            <p className="title">
              <span style={{ fontWeight: 600, fontSize: 30 }}>
                {privilage ? privilage + "%" : 0}
              </span>
            </p>
          </div>
        </div>
        <div
          className="bottom"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="bottomLeft">
            <p className="title" style={{ fontSize: 30 }}>
              Umumiy narx (so`mda):
            </p>
          </div>
          <div className="bottomRight">
            <p className="title">
              <span
                style={
                  privilage
                    ? {
                        textDecoration: "line-through",
                        color: "red",
                        fontWeight: 600,
                        fontSize: 30,
                      }
                    : {
                        textDecoration: "none",
                        color: "black",
                        fontWeight: 600,
                        fontSize: 30,
                      }
                }
              >
                {modalAnalizData.reduce((a, b) => a + b.price, 0)}
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 30,
                }}
              >
                {privilage && (
                  <span style={{ color: "green" }}>
                    {" "}
                    {modalAnalizData.reduce((a, b) => a + b.price, 0) -
                      (modalAnalizData.reduce((a, b) => a + b.price, 0) *
                        privilage) /
                        100}{" "}
                  </span>
                )}
              </span>
            </p>
          </div>
        </div>
      </Drawer>

      <ModalContextProvider
        RefObj={RefObj}
        modalIsOpen={modalIsOpen2}
        setIsOpen={setIsOpen2}
      >
        <ConfirmModal title={"To'lov holatini o'zgartirish"}>
          <div className="left" style={{ marginBottom: 30 }}>
            <Controller
              control={control}
              name="patient"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select"
                  value={value}
                  placeholder="Holatni tanlang"
                  options={optionStatus}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setPaymentStatus(+v.value);
                  }}
                  ref={ref}
                />
              )}
            />
            {errors.patient && (
              <p className="errorText">Iltimos to`lov holatini tanlang!</p>
            )}
          </div>

          <div
            className="btns"
            style={{ display: "flex", gap: "20px", justifyContent: "end" }}
          >
            <Button
              class="btn btn-btn-outline-primary btn-rounded"
              variant="contained"
              style={{
                border: "1px solid #3f51b5",
              }}
              onClick={() => {
                setIsOpen2(false);
              }}
            >
              Bekor qilish
            </Button>
            <Button
              class="btn btn-primary btn-rounded"
              variant="contained"
              onClick={onchangeStatus}
            >
              Holatini o`zgartirish
            </Button>
          </div>
        </ConfirmModal>
      </ModalContextProvider>
    </>
  );
};

export default OrdersMain;
