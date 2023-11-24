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
import { Badge } from "antd";

const MainResult = () => {
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState([]);
  const router = useRouter();

  useEffect(() => {
    OrderProvider.getAllAnalysisStatus(1, 1000).then((res) => {
      console.log(res.data.data);
      setAnalysisStatus(res.data.data);
    });
  }, []);

  const handleEditResult = (obj) => {
    console.log(obj);
    router.push(
      `/dashboard/laborant/edit-result?patientId=${obj.patientId}&orderId=${obj.id}`
    );
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
                  item.analysisStatus === 21 || item.analysisStatus === 41
              )
              .map((obj, index) => (
                <tr key={index}>
                  <td
                    onClick={() => {
                      router.push(
                        `/dashboard/laborant/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                      );
                    }}
                    style={{ minWidth: "15%" }}
                    className="col"
                  >
                    {index + 1}.{obj.firstName} {obj.lastName}
                  </td>
                  <td
                    onClick={() => {
                      router.push(
                        `/dashboard/laborant/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                      );
                    }}
                    style={{ minWidth: "45%" }}
                    className="col"
                  >
                    {obj.analysisName}
                  </td>
                  <td
                    onClick={() => {
                      router.push(
                        `/dashboard/laborant/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                      );
                    }}
                    style={{ minWidth: "15%" }}
                    className="col"
                  >
                    {moment(new Date(obj.createdAt)).format("DD.MM.YYYY HH:mm")}
                  </td>
                  <td
                    onClick={() => {
                      router.push(
                        `/dashboard/laborant/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                      );
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
                      <IconButton onClick={() => handleEditResult(obj)}>
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
        </tbody>
      </table>
    </ParasitologyResultWrapper>
  );
};

export default MainResult;
