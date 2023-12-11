import React, { useEffect, useRef, useState } from "react";
import TahlillarWrapper from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import OrderProvider from "../../../../../../Data/OrderProvider";
import moment from "moment";
import { Badge, Drawer, Pagination } from "antd";

const Tahlillar = () => {
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };


  useEffect(() => {
    setLoading(true)
    OrderProvider.getAllAnalysisStatus(currentPage , 10).then((res) => {
      console.log(res.data);
      setAnalysisStatus(res.data.data);
      setTotalElements(res.data?.recordsTotal)
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      setLoading(false)
    })
  }, [ currentPage]);

  return (
    <TahlillarWrapper>
      <div className="top">
        <h3>Tahlillar</h3>
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
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            analysisStatus?.length && analysisStatus?.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "10%" }} className="col">
                  {index+ (currentPage-1)*10 + 1}.{obj.firstName} {obj.lastName}
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
        onChange={onChange}
      />
    </TahlillarWrapper>
  );
};

export default Tahlillar;
