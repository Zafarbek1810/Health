import React, { useEffect, useRef, useState } from "react";
import TahlillarWrapper from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import OrderProvider from "../../../../../../Data/OrderProvider";
import moment from "moment";
import { useRouter } from "next/router";
import { Badge, Drawer, Pagination, Popover, Radio, Space } from "antd";
import {
  Button,
  ButtonBase,
  ButtonGroup,
  IconButton,
  StepButton,
} from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import EyeSvg from "../../../../../Common/Svgs/EyeSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import ConfirmModal from "../../../../../Common/ConfirmModal";
import { toast } from "react-toastify";
import AnalizProvider from "../../../../../../Data/AnalizProvider";
import { Input, DatePicker } from "antd";
import FilterIconSvg from "../../../../../Common/Svgs/FilterIconSvg";
const { Search } = Input;
const { RangePicker } = DatePicker;

const Tahlillar = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState([]);
  const [changeAnalizId, setChangeAnalizId] = useState(null);
  const [resultStatus, setResultStatus] = useState(null);
  const [orderDetailId, setOrderDetailId] = useState(null);
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpenModal, setIsOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerData, setDrawerData] = useState({});
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [analysiStatusFilter, setAnalysisStatusFilter] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [dateString, setDateString] = useState(["", ""]);

  const handleEditStatus = (obj) => {
    console.log(obj);
    setIsOpenModal(true);
    if (obj) {
      setValue("analysisStatus", {
        value: obj.analysisStatus,
        label:
          obj.analysisStatus === 11
            ? "Navbatda"
            : obj.analysisStatus === 21
            ? "Natija kutilmoqda"
            : obj.analysisStatus === 31
            ? "Rad etilgan"
            : obj.analysisStatus === 41
            ? "Tayyor"
            : obj.analysisStatus === 51
            ? "Bekor qilingan"
            : "",
      });
    }
    setOrderDetailId(obj.id);
  };

  const onChangePagination = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    const body = {};
    body.keyword = keyword || null;
    body.analysisStatus = analysiStatusFilter || null;
    body.fromDate = dateString[0] || null;
    body.toDate = dateString[1] || null;
    body.pageNum = currentPage;
    body.laboratoryId = null;
    body.pageSize = 20;
    OrderProvider.getAllAnalysisStatus(body).then((res) => {
      console.log(res.data.data);
      setAnalysisStatus(res.data.data);
      setTotalElements(Math.floor(res.data?.recordsTotal / 2));
    });
  }, [modalIsOpenModal, keyword, currentPage, analysiStatusFilter, dateString]);

  const analizStatus = [
    // { value: 11, label: "Navbatda" },
    // { value: 21, label: "Natija kutilmoqda" },
    { value: 31, label: "Rad etish" },
    { value: 41, label: "Natijani tasdiqlash" },
    // { value: 51, label: "Bekor qilish" },
  ];

  const onSubmitChangeStatus = () => {
    OrderProvider.changeAnalizStatus(
      orderDetailId,
      changeAnalizId,
      resultStatus
    )
      .then((res) => {
        console.log(res.data.data);
        toast.success(res.data.message);
        setIsOpenModal(false);
        setChangeAnalizId(null);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleOpenDrawer = (obj) => {
    setOpenDrawer(true);
    setDrawerData(obj);
  };

  const getPdfBtn = (drawerData) => {
    switch (drawerData.templateId) {
      case 1:
        AnalizProvider.getPdfAnalysis(true, drawerData.patientId, drawerData.id)
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
        break;

      case 2:
        AnalizProvider.getPdfBacteriology(
          true,
          drawerData.patientId,
          drawerData.id
        )
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
        break;

      case 3:
        AnalizProvider.getPdfDisbakterioz(
          true,
          drawerData.patientId,
          drawerData.id
        )
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
        break;

      case 4:
        AnalizProvider.getPdfBloodPurity(
          true,
          drawerData.patientId,
          drawerData.id
        )
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
        break;

      case 5:
        AnalizProvider.getPdfBreastMilk(
          true,
          drawerData.patientId,
          drawerData.id
        )
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
        break;

      case 6:
        AnalizProvider.getPdfHemoCulture(
          true,
          drawerData.patientId,
          drawerData.id
        )
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
        break;
    }
  };

  const onSearchOrder = (e) => {
    setKeyword(e.target.value);
  };

  const onChangeAnalysisStatus = (e) => {
    console.log("checked = ", e.target.value);
    setAnalysisStatusFilter(e.target.value);
  };

  const content = (
    <div>
      <Radio.Group
        onChange={onChangeAnalysisStatus}
        value={analysiStatusFilter}
      >
        <Space direction="vertical">
          <Radio value={null}>Barchasi</Radio>
          <Radio value={21}>Natija kutilmoqda</Radio>
          <Radio value={31}>Rad etilgan</Radio>
          <Radio value={41}>Natija chiqdi</Radio>
          <Radio value={51}>Bekor qilingan</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  return (
    <TahlillarWrapper>
      <div className="top">
        <h3>Tahlillar</h3>
        <Search
          placeholder="F.I.SH"
          allowClear
          enterButton="Qidirish"
          className="col-4"
          size="large"
          onChange={onSearchOrder}
        />
        <RangePicker
          onChange={(date, dateString) => {
            setDateString(dateString);
            console.log(dateString);
          }}
        />
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "15%" }} className="col">
              Ismi Familyasi
            </th>
            <th style={{ minWidth: "25%" }} className="col">
              Analiz Nomi
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Yaratilgan sana
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Natija chiqqan sana
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Natija
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Natija holati{" "}
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
            <th style={{ minWidth: "5%" }} className="col"></th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            analysisStatus.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "15%" }} className="col">
                  {index + (currentPage - 1) * 20 + 1}.{obj.firstName}{" "}
                  {obj.lastName}
                </td>
                <td style={{ minWidth: "25%" }} className="col">
                  {obj.analysisName}
                </td>
                <td style={{ minWidth: "10%" }} className="col">
                  {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
                </td>
                <td style={{ minWidth: "10%" }} className="col">
                  {obj.resultTime === null
                    ? ""
                    : moment(new Date(obj.resultTime)).format(
                        "DD.MM.YYYY HH:mm"
                      )}
                </td>
                <td
                  style={
                    obj.resultStatus === 17
                      ? { minWidth: "10%", color: "#3cc18a" }
                      : { minWidth: "10%", color: "#c13c3c" }
                  }
                  className="col"
                >
                  {obj.resultStatus === 17
                    ? "Ijobiy"
                    : obj.resultStatus === 27
                    ? "Salbiy"
                    : ""}
                </td>
                <td style={{ minWidth: "15%" }} className="col-badge">
                  {obj.analysisStatus === 11 ? (
                    <span>
                      <Badge status="processing" className="badge_default" />{" "}
                      Navbatda
                    </span>
                  ) : obj.analysisStatus === 21 ? (
                    <span>
                      <Badge status="processing" className="badge_primary" />{" "}
                      Natija kutilmoqda
                    </span>
                  ) : obj.analysisStatus === 31 ? (
                    <span>
                      <Badge status="processing" className="badge_danger" /> Rad
                      etilgan
                    </span>
                  ) : obj.analysisStatus === 41 ? (
                    <span>
                      <Badge status="processing" className="badge_success" />{" "}
                      Natija chiqdi
                    </span>
                  ) : obj.analysisStatus === 51 ? (
                    <span>
                      <Badge status="processing" className="badge_warning" />{" "}
                      Bekor qilingan
                    </span>
                  ) : (
                    <></>
                  )}
                </td>
                <td style={{ minWidth: "5%" }} className="col">
                  <IconButton onClick={() => handleEditStatus(obj)}>
                    <EditSvg />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDrawer(obj)}>
                    <EyeSvg />
                  </IconButton>
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
        title="Buyurtma"
        placement="right"
        closable={true}
        onClose={() => setOpenDrawer(false)}
        visible={openDrawer}
        width={700}
      >
        <div style={{ fontSize: 18 }}>
          <b>Bemor ism-familyasi:</b> {drawerData.firstName}{" "}
          {drawerData.lastName}
        </div>
        <div style={{ fontSize: 18 }}>
          <b>Bemor telefon raqami:</b> {drawerData.phoneNumber}{" "}
        </div>
        <div style={{ fontSize: 18 }}>
          <b>Analiz nomi:</b> {drawerData.analysisName}
        </div>

        <button
          style={{
            marginTop: 30,
            width: "100%",
            background: "transparent",
            color: "rgb(3, 132, 252)",
            border: "none",
          }}
          onClick={() => getPdfBtn(drawerData)}
        >
          Natijani ko`rish
        </button>
      </Drawer>

      <ModalContextProvider
        RefObj={RefObj}
        modalIsOpen={modalIsOpenModal}
        setIsOpen={setIsOpenModal}
      >
        <ConfirmModal title={"Statusni o'zgartirish"}>
          <div className="left" style={{ marginBottom: 0 }}>
            <Controller
              control={control}
              name="analysisStatus"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select"
                  value={value}
                  placeholder="Statusni tanlang"
                  options={analizStatus}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setChangeAnalizId(+v.value);
                  }}
                  ref={ref}
                />
              )}
            />
            <Radio.Group
              onChange={(e) => setResultStatus(e.target.value)}
              value={resultStatus}
              style={{ marginTop: 30 }}
            >
              <Space direction="horizontal">
                <Radio defaultChecked value={17}>
                  Ijobiy
                </Radio>
                <Radio value={27}>Salbiy</Radio>
              </Space>
            </Radio.Group>
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
                setIsOpenModal(false);
              }}
            >
              Bekor qilish
            </Button>
            <Button
              class="btn btn-primary btn-rounded"
              variant="contained"
              onClick={onSubmitChangeStatus}
            >
              Statusni o`zgartirish
            </Button>
          </div>
        </ConfirmModal>
      </ModalContextProvider>
    </TahlillarWrapper>
  );
};

export default Tahlillar;
