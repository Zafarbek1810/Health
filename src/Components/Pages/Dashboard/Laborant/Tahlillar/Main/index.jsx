import React, { useEffect, useRef, useState } from "react";
import TahlillarWrapper from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import OrderProvider from "../../../../../../Data/OrderProvider";
import moment from "moment";
import { useRouter } from "next/router";
import { Badge, Button, Input, Pagination, DatePicker } from "antd";
import ConfirmModal from "../../../../../Common/ConfirmModal";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import AnalizProvider from "../../../../../../Data/AnalizProvider";
const { Search } = Input;
const { RangePicker } = DatePicker;

const Tahlillar = () => {
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState([]);
  const router = useRouter();
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [detailObj, setDetailObj] = useState({})
  const [analysisId, setAnalysisId] = useState(null)
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [dateString, setDateString] = useState(["", ""]);


  const onChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };


  useEffect(() => {
    const body = {};
    body.keyword = keyword || null;
    body.analysisStatus = 11;
    body.fromDate = dateString[0] || null;
    body.toDate = dateString[1] || null;
    body.laboratoryId = null;
    body.pageNum = currentPage;
    body.pageSize = 10;
    OrderProvider.getAllAnalysisStatus(body).then((res) => {
      setAnalysisStatus(res.data.data);
      setTotalElements(res.data.recordsTotal)
    });
  }, [keyword, currentPage, dateString]);

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
        case 4: router.push(
          `/dashboard/laborant/blood-purity-add?id=${detailObj.id}&patientId=${detailObj.patientId}`
        ); break;
        case 5: router.push(
          `/dashboard/laborant/add-breast-milk?id=${detailObj.id}&patientId=${detailObj.patientId}`
        ); break;
        case 6: router.push(
          `/dashboard/laborant/hemo-culture?id=${detailObj.id}&patientId=${detailObj.patientId}`
        ); break;
        case 7: router.push(
          `/dashboard/laborant/microbiology-examination?id=${detailObj.id}&patientId=${detailObj.patientId}`
        ); break;
        // case 8: router.push(
        //   `/dashboard/laborant/add-result-hepatits?id=${detailObj.id}&patientId=${detailObj.patientId}`
        // ); break;
        case 9: router.push(
          `/dashboard/laborant/add-result-hepatits?id=${detailObj.id}&patientId=${detailObj.patientId}&templateId=${res?.data.data.templateAnalysis.id}&analysisId=${analysisId}`
        ); break;
        case 10: router.push(
          `/dashboard/laborant/add-virusology-analysis?id=${detailObj.id}&patientId=${detailObj.patientId}&templateId=${res?.data.data.templateAnalysis.id}&analysisId=${analysisId}`
        ); break;
        case 11: router.push(
          `/dashboard/laborant/microbiology-examination?id=${detailObj.id}&patientId=${detailObj.patientId}&templateId=${res?.data.data.templateAnalysis.id}&analysisId=${analysisId}`
        ); break;

        default : router.push(`/dashboard/laborant/tahlillar`);
      }
      
    })
    .catch(err=>{
      console.log(err);
    })
  }, [analysisId,])

  const onSearchOrder = (e) => {
    setKeyword(e.target.value);
  };
  
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
            analysisStatus.length ?
            analysisStatus.map((obj, index) => (
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
            )) : <h3 style={{textAlign:'center', margin: '20px 0'}}>Mavjud emas</h3>
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
        defaultPageSize={10}
        onChange={onChange}
      />

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
