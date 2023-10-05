import React, { useEffect, useState } from "react";
import CreateOrderWrapper from "./style";
import AnalizProvider from "../../../../../../Data/AnalizProvider";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import { Button } from "@mui/material";
import OrderProvider from "../../../../../../Data/OrderProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import removeDuplicates from "../../../../../../utils/removeDublicateArray";

const UpdateOrder = ({ id }) => {
  console.log(id);
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [analiz, setAnaliz] = useState({});
  const [laboratory, setLaboratory] = useState([]);
  const [analizId, setAnalizId] = useState({});
  const [laboratoryId, setLaboratoryId] = useState([]);
  const [paymentId, setPaymentId] = useState([]);
  const [defaultLabId, setDefaultLabId] = useState([]);
  const [defaultAnalizId, setDefaultAnalizId] = useState([]);
  const [uniqueAnalizIds, setUniqueAnalizIds] = useState([]);

  useEffect(() => {
    laboratoryId.map((id) => {
      AnalizProvider.getAllAnalysisByLab(id)
        .then((res) => {
          setAnaliz({ ...analiz, [id]: res.data.data });
          console.log(res.data.data, id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [laboratoryId, id]);

  useEffect(() => {
    OrderProvider.getOrdersById(id)
      .then((res) => {
        if (res.data.data && res.data.data.orderDetailDTOS) {
          let uniqueLabIds = removeDuplicates(
            res.data.data.orderDetailDTOS.map((item) => item.laboratoryId)
          );
          setLaboratoryId(uniqueLabIds);
          setUniqueAnalizIds(removeDuplicates(
            res.data.data.orderDetailDTOS.map((item) => item.analysisId)
          ))
          console.log( analiz, laboratoryId, "uniqueAnalizIds");

          setDefaultLabId(
            uniqueLabIds.map((item) => ({
              value: item,
              label: laboratory.filter((i) => i.id === item)[0]?.name,
            }))
          );
        }
        console.log(res.data.data, "data");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, laboratory, analiz, laboratoryId, uniqueAnalizIds]);

  useEffect(() => {
    LabaratoryProvider.getAllLaboratory()
      .then((res) => {
        setLaboratory(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const optionLaboratory = laboratory?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const optionPayment = [
    { value: 10, label: "Naqd pul" },
    { value: 20, label: "Plastik" },
    { value: 30, label: "Hisobdan o'tkazish" },
  ];

  const onSubmit = (data) => {
    console.log(data);
    const body = {};
    // body.laboratoryId = laboratoryId;
    body.analysisIds = Object.values(analizId).flat();
    body.formPayment = paymentId;
    body.orderId = +id;

    OrderProvider.saveDetailOrder(body)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
          router.push(`/dashboard/cashier/order`);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CreateOrderWrapper>
      <div className="top">Buyurtma yaratish</div>
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          {defaultLabId.length > 0 && (
            <Select
              size="large"
              defaultValue={defaultLabId || []}
              mode="multiple"
              className="select w-100"
              placeholder="Labaratoriya tanlang"
              options={optionLaboratory}
              onChange={(v) => {
                setLaboratoryId(v);
              }}
            />
          )}

          {laboratoryId.map((id, index) => {
            return (
              <div className="analiz" key={index}>
                <div className="analizName">
                  {laboratory.filter((i) => i.id === id)[0].name}
                </div>
                {analiz[id] && (
                  <Select
                    size="large"
                    mode="multiple"
                    className="select w-100"
                    placeholder="Analiz tanlang"
                    options={analiz[id]?.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                    onChange={(v) => {
                      setAnalizId({ ...analizId, [id]: v });
                    }}
                  />
                )}
              </div>
            );
          })}

          <Select
            size="large"
            className="select w-100"
            placeholder="To'lov turini tanlang"
            options={optionPayment}
            onChange={(v) => {
              setPaymentId(v);
            }}
          />
          <Button
            class="col-12 btn btn-primary btn-rounded"
            variant="contained"
            type="submit"
          >
            Buyurtma yaratish
          </Button>
        </form>
        <div className="result">ddd</div>
      </div>
    </CreateOrderWrapper>
  );
};

export default UpdateOrder;
