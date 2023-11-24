import React, { useEffect, useState } from "react";
import TahlillarWrapper from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import OrderProvider from "../../../../../../Data/OrderProvider";
import moment from "moment";
import { useRouter } from "next/router";
import { Badge } from "antd";

const Tahlillar = () => {
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState([]);
  const router = useRouter();

  useEffect(() => {
    OrderProvider.getAllAnalysisStatus(1, 1000).then((res) => {
      console.log(res.data.data);
      setAnalysisStatus(res.data.data);
    });
  }, []);
  return (
    <TahlillarWrapper>
      <div className="top">
        <h3>Tahlillar</h3>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "15%" }} className="col">
              Ismi Familyasi
            </th>
            <th style={{ minWidth: "40%" }} className="col">
              Analiz Nomi
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Yaratilgan sana
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Natija chiqqan sana
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Natija holati
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            analysisStatus.map((obj, index) => (
              <tr key={index} 
              onClick={() => {
                if(obj.analysisStatus === 21){
                  router.push(`/dashboard/laborant/tahlillar`)
                } else{
                  router.push(
                    `/dashboard/operator/analiz-result-add?id=${obj.id}&patientId=${obj.patientId}`
                  );
                }
              }}
              >
                <td
                  style={{ minWidth: "15%" }}
                  className="col"
                >
                  {index + 1}.{obj.firstName} {obj.lastName}
                </td>
                <td
                  style={{ minWidth: "40%" }}
                  className="col"
                >
                  {obj.analysisName}
                </td>
                <td
                  style={{ minWidth: "15%" }}
                  className="col"
                >
                  {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
                </td>
                <td
                  style={{ minWidth: "15%" }}
                  className="col"
                >
                  {
                    obj.resultTime === null ? '' :
                  moment(new Date(obj.resultTime)).format("DD.MM.YYYY HH:mm")
                  }
                </td>
                <td
                  style={{ minWidth: "15%" }}
                  className="col-badge"
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
    </TahlillarWrapper>
  );
};

export default Tahlillar;
