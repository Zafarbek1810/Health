import React, { useEffect, useRef, useState } from "react";
import TahlillarWrapper from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import OrderProvider from "../../../../../../Data/OrderProvider";
import moment from "moment";
import { useRouter } from "next/router";
import { Badge, Button } from "antd";
import ConfirmModal from "../../../../../Common/ConfirmModal";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import AnalizProvider from "../../../../../../Data/AnalizProvider";

const Tahlillar = () => {
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState([]);
  const router = useRouter();
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [detailObj, setDetailObj] = useState({})
  const [analysisId, setAnalysisId] = useState(null)

  useEffect(() => {
    OrderProvider.getAllAnalysisStatus(1, 1000).then((res) => {
      console.log(res.data);
      setAnalysisStatus(res.data.data);
    });
  }, []);

  useEffect(()=>{
    AnalizProvider.getShablonId(analysisId)
    .then(res=>{
      console.log(res.data.data);
      switch(detailObj?.analysisStatus===11 && res?.data.data.templateAnalysis.id){
        case 1 : router.push(
          `/dashboard/laborant/analiz-result-add?id=${detailObj.id}&patientId=${detailObj.patientId}`
        ); break;
        case 2: router.push(
          `/dashboard/laborant/antibiotic-result-add?id=${detailObj.id}&patientId=${detailObj.patientId}`
        ); break;
        case 3: router.push(
          `/dashboard/laborant/disbakterioz-result-add?id=${detailObj.id}&patientId=${detailObj.patientId}`
        ); break;

        default : router.push(`/dashboard/laborant/tahlillar`);
      }
      
    })
    .catch(err=>{
      console.log(err);
    })
  }, [analysisId])
  
  return (
    <TahlillarWrapper>
      <div className="top">
        <h3>Tahlillar</h3>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "20%" }} className="col">
              Ismi Familyasi
            </th>
            <th style={{ minWidth: "40%" }} className="col">
              Analiz Nomi
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Yaratilgan sana
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Natija holati
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            analysisStatus.filter(item=>item.analysisStatus===11).map((obj, index) => (
              <tr
                key={index}
                onClick={() => {
                  setAnalysisId(+obj.analysisId)
                  setDetailObj(obj)
                }}
              >
                <td style={{ minWidth: "20%" }} className="col">
                  {index + 1}.{obj.firstName} {obj.lastName}
                </td>
                <td style={{ minWidth: "40%" }} className="col">
                  {obj.analysisName}
                </td>
                <td style={{ minWidth: "20%" }} className="col">
                  {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
                </td>
                <td style={{ minWidth: "20%" }} className="col-badge">
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
              </tr>
            ))
          ) : (
            <MinLoader />
          )}
        </tbody>
      </table>

      <ModalContextProvider
        RefObj={RefObj}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      >
        <ConfirmModal title={"Shablonni tanlang"} obj={detailObj}>
          <Button
            onClick={() => {
              if (detailObj.analysisStatus === 21) {
                router.push(`/dashboard/laborant/tahlillar`);
              } else {
                router.push(
                  `/dashboard/laborant/analiz-result-add?id=${detailObj.id}&patientId=${detailObj.patientId}`
                );
              }
            }}
          >
            Shablon 1
          </Button>
          <Button
            onClick={() => {
              if (detailObj.analysisStatus === 21) {
                router.push(`/dashboard/laborant/tahlillar`);
              } else {
                router.push(
                  `/dashboard/laborant/antibiotic-result-add?id=${detailObj.id}&patientId=${detailObj.patientId}`
                );
              }
            }}
          >
            Shablon 2
          </Button>
        </ConfirmModal>
      </ModalContextProvider>
    </TahlillarWrapper>
  );
};

export default Tahlillar;
