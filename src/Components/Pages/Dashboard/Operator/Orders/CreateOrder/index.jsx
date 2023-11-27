import React, { useEffect, useState } from "react";
import CreateOrderWrapper from "./style";
import AnalizProvider from "../../../../../../Data/AnalizProvider";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { Controller, useForm } from "react-hook-form";
import { Select } from "antd";
import { Button } from "@mui/material";
import OrderProvider from "../../../../../../Data/OrderProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AnalizPriceProvider from "../../../../../../Data/AnalizPriceProvider";
import removeDuplicates from "../../../../../../utils/removeDublicateArray";

const CreateOrder = ({ id }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [analiz, setAnaliz] = useState({});
  const [laboratory, setLaboratory] = useState([]);
  const [analizId, setAnalizId] = useState({});
  const [laboratoryId, setLaboratoryId] = useState([]);
  const [paymentId, setPaymentId] = useState(10);
  const [commonSum, setCommonSum] = useState("");
  const [changeAnaliz, setChangeAnaliz] = useState([]);
  const [newAnaliz, setNewAnaliz] = useState([]);
  
  console.log(newAnaliz, 'newAnaliz');
  
  useEffect(() => {
    AnalizPriceProvider.getAllPrices({ ids: Object.values(analizId).flat() })
      .then((res) => {
        setChangeAnaliz(res.data.data.allDTOList);
        console.log(res.data.data, "change");
        setCommonSum(res.data.data.sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newAnaliz]);

  useEffect(() => {
    laboratoryId.map((id) => {
      AnalizProvider.getAllAnalysisByLabWithPrice(id)
        .then((res) => {
          setAnaliz({ ...analiz, [id]: res.data.data });
          console.log(res.data.data, id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [laboratoryId]);

  useEffect(() => {
    LabaratoryProvider.getAllLaboratory()
      .then((res) => {
        setLaboratory(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          router.push(`/dashboard/operator/order`);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Barcha maydonlarni to'ldiring!");
      });
  };

  return (
    <CreateOrderWrapper>
      <div className="top">Buyurtma yaratish</div>
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="left">
            <div>
              <label>
                Laboratoriya tanlang<span className="span">*</span>
              </label>
              <Select
                size="large"
                mode="multiple"
                className="select w-100"
                placeholder="Labaratoriya tanlang"
                options={optionLaboratory}
                onChange={(v) => {
                  setLaboratoryId(v);
                }}
              />
            </div>
            <div>
              <label>
                To`lov turi<span className="span">*</span>
                <Select
                  size="large"
                  // status="error"
                  className="select w-100"
                  placeholder="To'lov turini tanlang"
                  options={optionPayment}
                  onChange={(v) => {
                    setPaymentId(v);
                  }}
                />
              </label>
            </div>
            <div className="result">
              <div className="result-top">
                <h3>Umumiy narxi:</h3>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    className="price"
                    // style={{ textDecoration: "line-through" }}
                  >
                    {commonSum} so`m
                  </span>
                  {/* <span className="price">
                    {((100 - data.privilege) * commonSum) / 100} so`m
                  </span> */}
                </div>
              </div>
              <hr />
              <div className="redult-bottom">
                {changeAnaliz.map((item) => {
                  return (
                    <div key={item.id} className="analiz-result">
                      <div className="name">{item?.name}</div>
                      <div className="price">{item.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="right">
            {laboratoryId.map((id, index) => {
              return (
                <div
                  className="analiz"
                  style={{ marginBottom: 30 }}
                  key={index}
                >
                  <div className="analizName">
                    {laboratory.filter((i) => i.id === id)[0].name}
                  </div>
                  <Select
                    size="large"
                    mode="multiple"
                    className="select w-100"
                    placeholder="Analiz tanlang"
                    options={analiz[id]?.map((item) => {
                      return {
                        value: item.id,
                        label: item.analysisName || item.name,
                      };
                    })}
                    onChange={(v) => {
                      setAnalizId({ ...analizId, [id]: v });
                      setNewAnaliz(v);
                    }}
                  />
                </div>
              );
            })}
            <Button
              class="col-12 btn btn-primary btn-rounded"
              variant="contained"
              type="submit"
            >
              Buyurtma yaratish
            </Button>
          </div>
        </form>
      </div>
    </CreateOrderWrapper>
  );
};

export default CreateOrder;
