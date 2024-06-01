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
import { toast } from "react-toastify";
import moment from "moment";
import { Badge, Input, Drawer, Pagination, Popover, Checkbox, Radio, Space } from "antd";
import ConfirmModal from "../../../../../Common/ConfirmModal";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import Select from "react-select";
import AnalizProvider from "../../../../../../Data/AnalizProvider";
import numberFormat from "../../../../../../utils/numberFormat";
import FilterIconSvg from "../../../../../Common/Svgs/FilterIconSvg";
const { Search } = Input;

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
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [order, setOrder] = useState([]);
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [privilage, setPrivilage] = useState(null);
  const [drawerData, setDrawerData] = useState({});
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [paymentType, setPaymentType] = useState(null);
  const [paymentStatusRadio, setPaymentStatusRadio] = useState(null);
  const [forrender, setForrender] = useState(null);

  const onChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

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
    OrderProvider.getAllOrders(currentPage, 20, keyword, paymentType, paymentStatusRadio)
      .then((res) => {
        setTotalElements(Math.floor(res.data.recordsTotal / 2));
        console.log(res.data);
        setOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, keyword, paymentType, paymentStatusRadio, forrender]);

  const render = () => {
    setLoading(true);
    OrderProvider.getAllOrders(currentPage, 20, keyword, paymentType, paymentStatusRadio)
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
            ? "To`landi"
            : obj.paymentStatus === 0
            ? "To`lanmadi"
            : "Qaytarildi",
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
        setDrawerData(res.data.data);
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
    { value: "1", label: "To`landi" },
    { value: "0", label: "To`lanmadi" },
    { value: "-1", label: "Qaytarildi" },
  ];

  const onchangeStatus = () => {
    const body = {
      orderId: orderId,
      paymentStatus: paymentStatus,
    };
    OrderProvider.changePaymentStatus(body)
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

  const onSearch = (e) => {
    console.log(e.target.value);
    setKeyword(e.target.value);
  };

  const getCheque = (drawerData) => {
    AnalizProvider.getChequeAnalysis(true, drawerData.orderId)
      .then((res) => {
        console.log(res);
        const blob = new Blob([res.data], {
          type: "application/pdf",
        });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        //no download
        link.target = "_blank";
        link.click();

        // link.download = `${drawerData.firstName} ${drawerData.lastName}.pdf`;
        // link.click();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const onChangeCheck = (e) => {
    console.log("checked = ", e.target.value);
    setPaymentType(e.target.value)
  };
  const onChangePaymentStatus = (e) => {
    console.log("checked = ", e.target.value);
    setPaymentStatusRadio(e.target.value)
  };

  const content = (
    <div>
      <Radio.Group onChange={onChangeCheck} value={paymentType}>
      <Space direction="vertical">
        <Radio value={null}>Barchasi</Radio>
        <Radio value={10}>Naqd</Radio>
        <Radio value={20}>Plastik</Radio>
      </Space>
    </Radio.Group>
    </div>
  );
  const content2 = (
    <div>
      <Radio.Group onChange={onChangePaymentStatus} value={paymentStatusRadio}>
      <Space direction="vertical">
        <Radio value={null}>Barchasi</Radio>
        <Radio value={0}>To`lanmagan</Radio>
        <Radio value={1}>To`langan</Radio>
        <Radio value={-1}>Qaytarilgan</Radio>
      </Space>
    </Radio.Group>
    </div>
  );

  return (
    <>
      <OrderMainWrapper>
        <div className="top">
          <h3 className="col-1">Buyurtmalar</h3>

          <Search
            placeholder="F.I.SH"
            allowClear
            enterButton="Qidirish"
            className="col-4"
            size="large"
            onChange={onSearch}
          />
        </div>
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
              <th style={{ minWidth: "10%" }} className="col">
                To`lov turi{" "}
                <Popover className="pop" content={content} title="Filterlash" trigger="click">
                  <button>
                    <FilterIconSvg />
                  </button>
                </Popover>
              </th>
              <th style={{ minWidth: "10%" }} className="col">
                Narxi
              </th>
              <th style={{ minWidth: "10%" }} className="col">
                To`lov holati
                <Popover className="pop" content={content2} title="Filterlash" trigger="click">
                  <button>
                    <FilterIconSvg />
                  </button>
                </Popover>
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
                    {index + (currentPage - 1) * 20 + 1}.{obj.firstName}{" "}
                    {obj.lastName}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.phoneNumber}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
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
                    {numberFormat(obj.price)}
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
                      <IconButton disabled={obj.paymentStatus === 1} onClick={() => handleEditStatus(obj)}>
                        <EditSvg />
                      </IconButton>
                      <IconButton disabled={obj.paymentStatus === 1} onClick={() => handleTableRow(obj)}>
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
        <Pagination
          style={{ textAlign: "right" }}
          defaultCurrent={currentPage}
          // defaultPageSize={20}
          current={currentPage}
          total={totalElements}
          onChange={onChange}
        />
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

        <div className="btns" style={{ display: "flex" }}>
          <button
            style={{
              marginTop: 30,
              width: "100%",
              background: "transparent",
              color: "rgb(3, 132, 252)",
              border: "none",
            }}
            onClick={() => getCheque(drawerData)}
          >
            Chekni ko`rish
          </button>
          <button
            style={{
              marginTop: 30,
              width: "100%",
              background: "transparent",
              color: "rgb(3, 132, 252)",
              border: "none",
            }}
            onClick={() => console.log(drawerData)}
          >
            Chekni chop etish
          </button>
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
