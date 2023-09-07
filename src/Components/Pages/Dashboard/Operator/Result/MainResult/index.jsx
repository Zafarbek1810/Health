import React from "react";
import { useEffect, useState } from "react";
import ParasiteProvider from "../../../../../../Data/ParasiteProvider";
import { ParasitologyResultWrapper } from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import { IconButton } from "@mui/material";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
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
    OrderProvider.getAllOrders()
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


  return (
    <ParasitologyResultWrapper>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "20%" }} className="col">
              Ismi Familyasi
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Telefon
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Yaratilgan sana
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              confirm
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              To`lov turi
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Narxi
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
                      `/dashboard/operator/analiz-result-add?id=${obj.id}&patientId=${obj.patientId}`
                    );
                  }}
                  style={{ minWidth: "20%" }}
                  className="col"
                >
                  {index + 1}.{obj.firstName} {obj.lastName}
                </td>
                <td
                  onClick={() => {
                    router.push(
                      `/dashboard/operator/analiz-result-add?id=${obj.id}&patientId=${obj.patientId}`
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
                      `/dashboard/operator/analiz-result-add?id=${obj.id}&patientId=${obj.patientId}`
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
                      `/dashboard/operator/analiz-result-add?id=${obj.id}&patientId=${obj.patientId}`
                    );
                  }}
                  style={{ minWidth: "15%" }}
                  className="col"
                >
                  {obj.confirm}
                </td>
                <td style={{ minWidth: "15%" }} className="col">
                  {+obj.paymentType === 10
                    ? "Naqd"
                    : obj.paymentType === 20
                    ? "Plastik"
                    : obj.paymentType === 30
                    ? "Hisobdan o'tkazish"
                    : "Bunday to'lov turi yo'q"}
                </td>
                <td style={{ minWidth: "10%" }} className="col">
                  {obj.price}
                </td>
                <td style={{ minWidth: "10%" }} className="col">
                  {/* <div className="btns">
                    <IconButton onClick={() => handleEditOrderAnaliz(obj)}>
                      <EditSvg />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteOrder(obj)}>
                      <DeleteSvg />
                    </IconButton>
                  </div> */}
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
