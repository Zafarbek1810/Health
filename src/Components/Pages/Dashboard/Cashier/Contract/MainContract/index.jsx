import React, { useEffect, useRef, useState } from "react";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton, } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import VirusMainWrapper from "./style";
import HepatitProvider from "../../../../../../Data/HepatitProvider";
import ContractProvider from "../../../../../../Data/ContractProvider";
import AddContract from "../AddContract";
import UpdateContract from "../UpdateContract";
import { Badge, DatePicker, Tooltip, Input, Pagination, Radio, Space, Popover } from "antd";
import { Controller, useForm } from "react-hook-form";
import EyeSvg from "../../../../../Common/Svgs/EyeSvg";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import ConfirmModal from "../../../../../Common/ConfirmModal";
import Select from "react-select";
import FilterIconSvg from "../../../../../Common/Svgs/FilterIconSvg";
const { Search } = Input;
const { RangePicker } = DatePicker;

const MainContract = () => {
  const {
    register,
    setError,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState([]);
  const [contractId, setContractId] = useState(null);
  const [editContract, setEditContract] = useState({});
  const [paymentStatus, setPaymentStatus] = useState('')
  const confirm = useConfirm();
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [dateString, setDateString] = useState(["", ""]);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState(null);
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;


  const handleDeleteHepatit = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await ContractProvider.deleteContract(obj.id);
        setContract((p) =>
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

  const handleEditHepatit = (obj) => {
    setIsOpenModal2(true);
    setEditContract(obj);
  };

  useEffect(() => {
    setLoading(true);
    const body = {};
    body.keyword = keyword || null;
    body.paymentStatus = paymentStatusFilter;
    body.fromDate = dateString[0] || null;
    body.toDate = dateString[1] || null;
    body.pageNum = currentPage;
    body.pageSize = 20;
    ContractProvider.getAllContractBody(body)
      .then((res) => {
        console.log(res.data);
        setContract(res.data.data);
        setTotalElements(Math.floor(res.data?.recordsTotal / 2));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [keyword, currentPage, dateString, paymentStatusFilter]);

  const onSearchOrder = (e) => {
    setKeyword(e.target.value);
  };

  const onChangePagination = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    setLoading(true);
    ContractProvider.getAllContract()
      .then((res) => {
        setContract(res.data.data.content);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOpenModal, isOpenModal2]);

  const render = () => {
    setLoading(true);
    ContractProvider.getAllContract()
    .then((res) => {
      setContract(res.data.data.content);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const onChangePaymentStatusFilter = (e) => {
    console.log(e.target.value);
    setPaymentStatusFilter(e.target.value);
  };

  const content = (
    <div>
      <Radio.Group
        onChange={onChangePaymentStatusFilter}
        value={paymentStatusFilter}
      >
        <Space direction="vertical">
          <Radio value={null}>Barchasi</Radio>
          <Radio value={1}>To`langan</Radio>
          <Radio value={0}>To`lanmagan</Radio>
          <Radio value={-1}>Qaytarilgan</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  const openModal = () => {
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  const onCloseModal2 = () => {
    setIsOpenModal2(false);
  };

  const optionStatus = [
    { value: "PAID", label: "To`landi" },
    { value: "UNPAID", label: "To`lanmadi" },
    { value: "RETURNED", label: "Qaytarildi" },
  ];

  const handleChangePayment = (obj) => {
    setOpen2(true)
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
    console.log(obj);
    // setPaymentStatus(obj.paymentStatus);
    setContractId(obj.id);
  };

  const downloadExcel = () => {
    const body = {};
    body.keyword = keyword || null;
    body.paymentStatus = paymentStatus || null;
    body.fromDate = dateString[0] || null;
    body.toDate = dateString[1] || null;
    body.pageNum = currentPage;
    body.pageSize = 20;
    ContractProvider.downloadExcel(body)
      .then((res) => {
        console.log(res);
        const blob = new Blob([res.data], {
          type: "application/xlsx",
        });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        //no download
        // link.target = "_blank";
        // link.click();

        link.download = `${currentDate}.xlsx`;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onchangeStatus = () => {
    ContractProvider.changePaymentStatus(contractId, paymentStatus)
      .then((res) => {
        toast.success(res.message);
        setOpen2(false);
        render()
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik!");
      });
  };


  return (
    <VirusMainWrapper>
      <div className="top">
        <h3 className="col-2">Shartnomalar</h3>
        <Tooltip title="Qidirish">
          <Search
            placeholder="F.I.SH"
            classNames="col-4"
            allowClear
            enterButton="Qidirish"
            className="col-4"
            size="large"
            onChange={onSearchOrder}
          />
        </Tooltip>
        <div className="col-3 d-flex">
          <Tooltip title="Excel yuklash">
            <Button onClick={() => downloadExcel()}>
              <img src="/images/excelicon.png" alt="xls" />
            </Button>
          </Tooltip>
          <Tooltip title="Sana bo'yicha filter">
            <RangePicker
              onChange={(date, dateString) => {
                setDateString(dateString);
                console.log(dateString);
              }}
            />
          </Tooltip>
        </div>
        <Button
          class="col-2 btn btn-primary btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Shartnoma qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "18%" }} className="col">
            Shartnoma raqami
            </th>
            <th style={{ minWidth: "18%" }} className="col">
            Shartnoma summasi
            </th>
            <th style={{ minWidth: "18%" }} className="col">
              Obyekt nomi
            </th>
            <th style={{ minWidth: "18%" }} className="col">
              Shartnoma tuzgan hodim
            </th>
            <th style={{ minWidth: "14%" }} className="col">
              To`lov holati {' '}
              <Popover
                className="pop"
                content={content}
                title="Filterlash"
                trigger="click"
              >
                <button style={{ background: "transparent", border: "none" }}>
                  <FilterIconSvg />
                </button>
              </Popover>
            </th>
            <th style={{ minWidth: "14%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            contract.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "18%" }} className="col">
                  {index + 1}. {obj.contractNumber}
                </td>
                <td style={{ minWidth: "18%" }} className="col">
                 {obj.contractAmount}
                </td>
                <td style={{ minWidth: "18%" }} className="col">
                   {obj.objectName}
                </td>
                <td style={{ minWidth: "18%" }} className="col">
                   {obj.specialistName}
                </td>
                <td style={{ minWidth: "14%" }} className="col">
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
                <td style={{ minWidth: "14%" }} className="col">
                  <div className="btns">
                    
                    <IconButton onClick={() => handleEditHepatit(obj)}>
                      <EditSvg />
                    </IconButton>
                    <IconButton onClick={() => handleChangePayment(obj)}>
                      <EyeSvg />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteHepatit(obj)}>
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

      <Pagination
        style={{ textAlign: "right" }}
        defaultCurrent={currentPage}
        current={currentPage}
        total={totalElements}
        onChange={onChangePagination}
      />

      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <AddContract onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateContract onCloseModal2={onCloseModal2} editContract={editContract} />
      </Drawer>

      <ModalContextProvider
        RefObj={RefObj}
        modalIsOpen={open2}
        setIsOpen={setOpen2}
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
                    setPaymentStatus(v.value);
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
                setOpen2(false);
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
    </VirusMainWrapper>
  );
};

export default MainContract;
