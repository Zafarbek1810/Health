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

const MainResult = () => {
  const [parasitology, setParasitology] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    OrderProvider.getAllOrders(1, 2000)
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
  }, []);

  useEffect(() => {
    ParasiteProvider.getAllParasite()
      .then((res) => {
        setParasitology(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleEditResult = (obj) => {
    console.log(obj);
    router.push(
      `/dashboard/operator/edit-result?patientId=${obj.patientId}&orderId=${obj.id}`
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
            <th style={{ minWidth: "15%" }} className="col">
              Telefon
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Yaratilgan sana
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Tasdiqlangan sana
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Analiz natijasi
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Buyurtma holati
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
                <td
                  onClick={() => {
                    router.push(
                      `/dashboard/operator/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
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
                      `/dashboard/operator/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                    );
                  }}
                  style={{ minWidth: "15%" }}
                  className="col"
                >
                  {obj.phoneNumber}
                </td>
                <td
                  onClick={() => {
                    router.push(
                      `/dashboard/operator/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
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
                      `/dashboard/operator/list-result?patientId=${obj.patientId}&orderId=${obj.id}`
                    );
                  }}
                  style={{ minWidth: "15%" }}
                  className="col"
                >
                  {obj.approvedAt &&
                    moment(new Date(obj.approvedAt)).format("DD.MM.YYYY HH:mm")}
                </td>
                <td style={{ minWidth: "15%" }} className="col">
                  {obj.analysisResult === 1 ? (
                    <span style={{ color: "green" }}>Kiritilgan</span>
                  ) : (
                    <span style={{ color: "red" }}>Kiritilmagan</span>
                  )}
                </td>
                <td style={{ minWidth: "15%" }} className="col">
                  {obj.confirm === "1" ? (
                    <span style={{ color: "green" }}>Tasdiqlangan</span>
                  ) : obj.confirm === "0" ? (
                    <span style={{color:"red"}}>Rad etilgan</span>
                  ) : (
                    <span style={{ color: "orange" }}>Tasdiqlanmagan</span>
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
