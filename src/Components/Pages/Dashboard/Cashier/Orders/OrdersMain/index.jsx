import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import PatientProvider from "../../../../../../Data/PatientProvider";
import OrderMainWrapper from "./style";
import { Button, IconButton } from "@mui/material";
import OrderProvider from "../../../../../../Data/OrderProvider";
import MinLoader from "../../../../../Common/MinLoader";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import ConfirmModal from "../../../../../Common/ConfirmModal";
import moment from "moment";

const OrdersMain = () => {
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

  const handleCreateOrder = () => {
    OrderProvider.createOrder(patientId)
      .then((res) => {
        console.log(res.data.data);
        router.push(`/dashboard/cashier/order-create?id=${res.data.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const handleEditOrder = (obj) => {
    router.push(`/dashboard/cashier/order-update?id=${obj.id}`);
  };

  const optionPatient = patient?.map((item) => {
    return {
      value: item.id,
      label: item.first_name + " " + item.last_name,
    };
  });

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
      <OrderMainWrapper>
        <div className="top">
          <Controller
            control={control}
            name="region"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                className="select col-3 w-25"
                value={value}
                placeholder="Bemorni tanlang"
                options={optionPatient}
                onBlur={onBlur}
                onChange={(v) => {
                  onChange(v);
                  setPatientId(v.value);
                }}
                ref={ref}
              />
            )}
          />
          <Button
            class="col-2 btn btn-primary btn-rounded"
            variant="contained"
            onClick={handleCreateOrder}
          >
            Buyurtma yaratish
          </Button>
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
                Buyurtma holati
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                To`lov turi
              </th>
              <th style={{ minWidth: "10%" }} className="col">
                Narxi
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
                  {obj.confirm === 1 ? (
                    <span style={{ color: "green" }}>Tasdiqlangan</span>
                  ) : obj.confirm === 0 ? (
                    <span>Rad etilgan</span>
                  ) : (
                    <span style={{ color: "orange" }}>Tasdiqlanmagan</span>
                  )}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
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
                    <div className="btns">
                      <IconButton onClick={() => handleEditOrder(obj)}>
                        <EditSvg />
                      </IconButton>
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
      </OrderMainWrapper>
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

export default OrdersMain;
