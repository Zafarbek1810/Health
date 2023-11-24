import React, { useEffect, useRef, useState } from "react";
import TahlillarWrapper from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import OrderProvider from "../../../../../../Data/OrderProvider";
import moment from "moment";
import { useRouter } from "next/router";
import { Badge, Drawer } from "antd";
import { Button, ButtonBase, ButtonGroup, IconButton, StepButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import EyeSvg from "../../../../../Common/Svgs/EyeSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import ConfirmModal from "../../../../../Common/ConfirmModal";
import { toast } from "react-toastify";
import AnalizProvider from "../../../../../../Data/AnalizProvider";

const Tahlillar = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState([]);
  const [changeAnalizId, setChangeAnalizId] = useState(null);
  const [orderDetailId, setOrderDetailId] = useState(null);
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpenModal, setIsOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerData, setDrawerData] = useState({});

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

  useEffect(() => {
    OrderProvider.getAllAnalysisStatus(1, 1000).then((res) => {
      console.log(res.data.data);
      setAnalysisStatus(res.data.data);
    });
  }, [modalIsOpenModal]);

  const analizStatus = [
    // { value: 11, label: "Navbatda" },
    // { value: 21, label: "Natija kutilmoqda" },
    { value: 31, label: "Rad etish" },
    { value: 41, label: "Natijani tasdiqlash" },
    { value: 51, label: "Bekor qilish" },
  ];

  const onSubmitChangeStatus = () => {
    OrderProvider.changeAnalizStatus(orderDetailId, changeAnalizId)
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
    AnalizProvider.getPdfAnalysis(
      true,
      drawerData.patientId,
      drawerData.orderId
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
  };

  return (
    <TahlillarWrapper>
      <div className="top">
        <h3>Tahlillar</h3>
        <div className="indicators">
          <div className="item">
            <Badge status="processing" className="badge_default" />
            <span>Navbatda</span>
          </div>
          <div className="item">
            <Badge status="processing" className="badge_primary" />
            <span>Nataija kutilmoqda</span>
          </div>
          <div className="item">
            <Badge status="processing" className="badge_danger" />
            <span>Rad etilgan</span>
          </div>
          <div className="item">
            <Badge status="processing" className="badge_success" />
            <span>Natija chiqdi</span>
          </div>
          <div className="item">
            <Badge status="processing" className="badge_warning" />
            <span>Bekor qilingan</span>
          </div>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "10%" }} className="col">
              Ismi Familyasi
            </th>
            <th style={{ minWidth: "35%" }} className="col">
              Analiz Nomi
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Yaratilgan sana
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Natija chiqqan sana
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Telefon raqam
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Natija holati
            </th>
            <th style={{ minWidth: "10%" }} className="col"></th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            analysisStatus.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "10%" }} className="col">
                  {index + 1}.{obj.firstName} {obj.lastName}
                </td>
                <td style={{ minWidth: "35%" }} className="col">
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
                <td style={{ minWidth: "10%" }} className="col">
                  {obj.phoneNumber}
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
                <td style={{ minWidth: "10%" }} className="col">
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

      <Drawer
        title="Buyurtma"
        placement="right"
        closable={true}
        onClose={() => setOpenDrawer(false)}
        visible={openDrawer}
        width={700}
      >
        <div style={{fontSize:18}}>
          <b>Bemor ism-familyasi:</b> {drawerData.firstName}{" "}
          {drawerData.lastName}
        </div>
        <div style={{fontSize:18}}>
          <b>Bemor telefon raqami:</b> {drawerData.phoneNumber}{" "}
        </div>
        <div style={{fontSize:18}}>
          <b>Analiz nomi:</b> {drawerData.analysisName}
        </div>

        <StepButton style={{marginTop:30}} onClick={() => getPdfBtn(drawerData)}>Natijani ko`rish</StepButton>
      </Drawer>

      <ModalContextProvider
        RefObj={RefObj}
        modalIsOpen={modalIsOpenModal}
        setIsOpen={setIsOpenModal}
      >
        <ConfirmModal title={"Statusni o'zgartirish"}>
          <div className="left" style={{ marginBottom: 30 }}>
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
