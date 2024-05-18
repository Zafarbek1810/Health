import React from "react";
import { useEffect, useState } from "react";
import ParasiteProvider from "../../../../../../Data/ParasiteProvider";
import { ParasitologyResultWrapper } from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import { IconButton } from "@mui/material";
import OrderProvider from "../../../../../../Data/OrderProvider";
import moment from "moment";
import { useRouter } from "next/router";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import { Badge, Pagination } from "antd";

const MainResult = () => {
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState([]);
  const router = useRouter();
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    const body = {};
    body.keyword = null;
    body.analysisStatus = null;
    body.fromDate =null;
    body.toDate = null;
    body.pageNum = currentPage;
    body.laboratoryId = null;
    body.pageSize = 20;
    OrderProvider.getAllAnalysisStatus(body).then((res) => {
      console.log(res.data.data);
      setAnalysisStatus(res.data.data);
      setTotalElements(res.data?.recordsTotal/2);
    });
  }, [currentPage]);

  const handleEditResult = (obj) => {
    console.log(obj);
    switch(obj.templateId){
      case 1 : router.push(
        `/dashboard/laborant/edit-result?patientId=${obj.patientId}&orderId=${obj.id}`
      ); break;
      case 2: router.push(
        `/dashboard/laborant/edit-antibiotic?patientId=${obj.patientId}&orderId=${obj.id}`
      ); break;
      case 3: router.push(
        `/dashboard/laborant/edit-disbakterioz?patientId=${obj.patientId}&orderId=${obj.id}`
      ); break;
      case 4: router.push(
        `/dashboard/laborant/edit-blood-purity?patientId=${obj.patientId}&orderId=${obj.id}`
      ); break;
      case 5: router.push(
        `/dashboard/laborant/edit-breast-milk?patientId=${obj.patientId}&orderId=${obj.id}`
      ); break;
      case 6: router.push(
        `/dashboard/laborant/edit-hemo-culture?patientId=${obj.patientId}&orderId=${obj.id}`
      ); break;
      case 7: router.push(
        `/dashboard/laborant/edit-microorganism?patientId=${obj.patientId}&orderId=${obj.id}`
      ); break;
      case 8: router.push(
        `/dashboard/laborant/edit-result-hepatit?patientId=${obj.patientId}&orderId=${obj.id}`
      ); break;
      case 9: router.push(
        `/dashboard/laborant/edit-virusology-analysis?patientId=${obj.patientId}&orderId=${obj.id}`
      ); break;

      default : router.push(`/dashboard/laborant/tahlil-result`);
    }
  };

  return (
    <ParasitologyResultWrapper>
      <div className="top">
        <h3>Natijalar</h3>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "15%" }} className="col">
              Ismi Familyasi
            </th>
            <th style={{ minWidth: "45%" }} className="col">
              Analiz Nomi
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Yaratilgan sana
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Natija holati
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            analysisStatus
              .filter(
                (item) =>
                  item.analysisStatus !== 11 
              )
              .map((obj, index) => (
                <tr key={index}>
                  <td
                    onClick={() => {
                      switch(obj.templateId){
                        case 1 : router.push(
                          `/dashboard/laborant/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 2: router.push(
                          `/dashboard/laborant/list-antibiotic?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 3: router.push(
                          `/dashboard/laborant/list-disbakterioz?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 4: router.push(
                          `/dashboard/laborant/list-blood-purity?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 5: router.push(
                          `/dashboard/laborant/list-breast-milk?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 6: router.push(
                          `/dashboard/laborant/list-hemo-culture?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 7: router.push(
                          `/dashboard/laborant/list-microorganism?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 8: router.push(
                          `/dashboard/laborant/list-result-hepatit?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 9: router.push(
                          `/dashboard/laborant/list-virusology-analysis?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        default : router.push(`/dashboard/laborant/tahlil-result`);
                      }
                    }}
                    style={{ minWidth: "15%", fontSize:14 }}
                    className="col"
                  >
                    {index + 1}.{obj.firstName} {obj.lastName}
                  </td>
                  <td
                   onClick={() => {
                    switch(obj.templateId){
                      case 1 : router.push(
                        `/dashboard/laborant/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                      ); break;
                      case 2: router.push(
                        `/dashboard/laborant/list-antibiotic?patientId=${obj.patientId}&orderId=${obj.id}`
                      ); break;
                      case 3: router.push(
                        `/dashboard/laborant/list-disbakterioz?patientId=${obj.patientId}&orderId=${obj.id}`
                      ); break;
                      case 4: router.push(
                        `/dashboard/laborant/list-blood-purity?patientId=${obj.patientId}&orderId=${obj.id}`
                      ); break;
                      case 5: router.push(
                        `/dashboard/laborant/list-breast-milk?patientId=${obj.patientId}&orderId=${obj.id}`
                      ); break;
                      case 6: router.push(
                        `/dashboard/laborant/list-hemo-culture?patientId=${obj.patientId}&orderId=${obj.id}`
                      ); break;
                      case 7: router.push(
                        `/dashboard/laborant/list-microorganism?patientId=${obj.patientId}&orderId=${obj.id}`
                      ); break;
                      case 8: router.push(
                        `/dashboard/laborant/list-result-hepatit?patientId=${obj.patientId}&orderId=${obj.id}`
                      ); break;
                      case 9: router.push(
                        `/dashboard/laborant/list-virusology-analysis?patientId=${obj.patientId}&orderId=${obj.id}`
                      ); break;
                      default : router.push(`/dashboard/laborant/tahlil-result`);
                    }
                  }}
                    style={{ minWidth: "45%", fontSize:14, textAlign:'left' }}
                    className="col"
                  >
                    {obj.analysisName}
                  </td>
                  <td
                    onClick={() => {
                      switch(obj.templateId){
                        case 1 : router.push(
                          `/dashboard/laborant/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 2: router.push(
                          `/dashboard/laborant/list-antibiotic?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 3: router.push(
                          `/dashboard/laborant/list-disbakterioz?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 4: router.push(
                          `/dashboard/laborant/list-blood-purity?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 5: router.push(
                          `/dashboard/laborant/list-breast-milk?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 6: router.push(
                          `/dashboard/laborant/list-hemo-culture?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 7: router.push(
                          `/dashboard/laborant/list-microorganism?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 8: router.push(
                          `/dashboard/laborant/list-result-hepatit?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 9: router.push(
                          `/dashboard/laborant/list-virusology-analysis?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        default : router.push(`/dashboard/laborant/tahlil-result`);
                      }
                    }}
                    style={{ minWidth: "15%" }}
                    className="col"
                  >
                    {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
                  </td>
                  <td
                    onClick={() => {
                      switch(obj.templateId){
                        case 1 : router.push(
                          `/dashboard/laborant/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 2: router.push(
                          `/dashboard/laborant/list-antibiotic?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 3: router.push(
                          `/dashboard/laborant/list-disbakterioz?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 4: router.push(
                          `/dashboard/laborant/list-blood-purity?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 5: router.push(
                          `/dashboard/laborant/list-breast-milk?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 6: router.push(
                          `/dashboard/laborant/list-hemo-culture?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 7: router.push(
                          `/dashboard/laborant/list-microorganism?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 8: router.push(
                          `/dashboard/laborant/list-result-hepatit?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        case 9: router.push(
                          `/dashboard/laborant/list-virusology-analysis?patientId=${obj.patientId}&orderId=${obj.id}`
                        ); break;
                        default : router.push(`/dashboard/laborant/tahlil-result`);
                      }
                    }}
                    style={{ minWidth: "15%" }}
                    className="col"
                  >
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
                        <Badge status="processing" className="badge_danger" />{" "}
                        Rad etilgan
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
                    <div className="btns">
                      <IconButton onClick={() => handleEditResult(obj)} disabled={obj.analysisStatus === 41}>
                        <EditSvg />
                      </IconButton>
                      {/* <IconButton onClick={() => handleDeleteResult(obj)}>
                      <DeleteSvg />
                    </IconButton> */}
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <MinLoader />
          )}
          {analysisStatus.filter(
            (item) => item.analysisStatus === 21 || item.analysisStatus === 41
          ).length === 0 ? (
            <h3 style={{ textAlign: "center", padding: 10 }}>
              Natijalar mavjud emas
            </h3>
          ) : (
            ""
          )}
        </tbody>
      </table>
      <Pagination
        style={{ textAlign: "right" }}
        defaultCurrent={currentPage}
        current={currentPage}
        total={totalElements}
        onChange={onChange}
      />
    </ParasitologyResultWrapper>
  );
};

export default MainResult;
