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
import AnalizPriceProvider from "../../../../../../Data/AnalizPriceProvider";

const UpdateOrder = ({ id }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [analiz, setAnaliz] = useState(null);
  const [laboratory, setLaboratory] = useState([]);
  const [analizId, setAnalizId] = useState({});
  const [laboratoryId, setLaboratoryId] = useState([]);
  const [paymentId, setPaymentId] = useState([]);
  const [data, setData] = useState(null);
  const [defaultLab, setDefaultLab] = useState(null);
  const [newAnaliz, setNewAnaliz] = useState([]);
  const [commonSum, setCommonSum] = useState("");
  const [changeAnaliz, setChangeAnaliz] = useState([]);
  const [defaultResult, setDefaultResult] = useState([]);

  console.log(defaultLab, analiz, 'defaultlab')

  useEffect(() => {
    AnalizPriceProvider.getAllPrices({ ids: newAnaliz })
      .then((res) => {
        setChangeAnaliz(res.data.data.allDTOList);
        setCommonSum(res.data.data.sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newAnaliz]);

  useEffect(() => {
    AnalizPriceProvider.getDefaultPrice(id)
      .then((res) => {
        setNewAnaliz(res.data.data.allDTOList);
        setCommonSum(res.data.data.sum);
        console.log(res.data.data?.allDTOList, "defaultResult");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // useEffect(() => {
  //   if (defaultLab && id) {
  //     defaultLab.map((id) => {
  //       AnalizProvider.getAllAnalysisByLab(id)
  //         .then((res) => {
  //           setAnaliz({ ...analiz, [id]: res.data.data });
  //           console.log(res.data.data, "analiz");
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  //   }
  // }, [defaultLab, id]);

  console.log(newAnaliz, "newanaliz");

  useEffect(() => {
    if (id) {
      OrderProvider.getOrdersById(id)
        .then((res) => {
          setData(res.data.data);
          setPaymentId(res.data.data?.paymentType);
          setAnalizId([
            ...res.data.data.orderDetailDTOList.map((v) => v.analysisId),
          ]);
          setChangeAnaliz(res.data.data.orderDetailDTOList);
          getDefaultLab();
          // getDefaultAnalysis();
          console.log(res.data.data, "data");
          setLaboratoryId(
            res.data.data.orderDetailDTOList.map((item) => item.laboratoryId)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    if (defaultLab) {
      defaultLab.map((id) => {
        AnalizProvider.getAllAnalysisByLabWithPrice(id)
          .then((res) => {
            setAnaliz({ ...analiz, [id]: res.data.data });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [defaultLab, id]);

  useEffect(() => {
    LabaratoryProvider.getAllLaboratory()
      .then((res) => {
        setLaboratory(res.data.data);
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

  const onSubmit = (val) => {
    console.log(val);
    const body = {};
    // body.laboratoryId = laboratoryId[0];
    body.analysisIds =
      newAnaliz == 0 ? defaultResult.map((item) => item.id) : newAnaliz;
    body.formPayment = paymentId;
    body.orderId = +id;

    OrderProvider.updateOrder(body)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        router.push(`/dashboard/operator/order`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Barcha maydonlarni to'ldiring!");
      });
  };

  useEffect(() => {
    if (data?.orderDetailDTOList) {
      getDefaultLab();
    }
  }, [data?.orderDetailDTOList]);

  const getDefaultLab = () => {
    const lab = removeDuplicates(
      data?.orderDetailDTOList?.map((item) => item.laboratoryId)
    );
    setDefaultLab(lab);
  };

  const getDefaultAnalysis = (id) => {
    const analizzz = data?.orderDetailMap[id]?.map((item) => item.analysisId);
    return analizzz;
  };

  if (!data?.orderDetailDTOList || !defaultLab || !analiz) {
    return <div>Loading ...</div>;
  }

  return (
    <CreateOrderWrapper>
      <div className="top">Buyurtma o`zgartirish</div>
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
                defaultValue={defaultLab || []}
                className="select w-100"
                placeholder="Labaratoriya tanlang"
                options={optionLaboratory}
                onChange={(v) => {
                  // setLaboratoryId(v);
                  setDefaultLab(v);
                }}
              />
            </div>
            <div>
              <label>
                To`lov turi<span className="span">*</span>
                <Select
                  size="large"
                  defaultValue={[data?.paymentType]}
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
                    style={{ textDecoration: "line-through" }}
                  >
                    {commonSum} so`m
                  </span>
                  <span className="price">
                    {((100 - data.privilege) * commonSum) / 100} so`m
                  </span>
                </div>
              </div>
              <hr />
              <div className="redult-bottom">
                {changeAnaliz.length > 0 &&
                  changeAnaliz.map((item) => {
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
            {defaultLab.map((id, index) => {
              return (
                <div
                  className="analiz"
                  style={{ marginBottom: 30 }}
                  key={index}
                >
                  <div className="analizName">
                    {laboratory?.filter((i) => i.id === id)[0]?.name}
                  </div>
                  <Select
                    size="large"
                    mode="multiple"
                    defaultValue={getDefaultAnalysis(id)}
                    className="select w-100"
                    placeholder="Analiz tanlang"
                    options={analiz[id]?.map((item) => {
                      console.log(
                        {
                          value: item?.id,
                          label: item?.analysisName,
                        },
                        analiz,
                        "valuessss"
                      );
                      return {
                        value: item?.id,
                        label: item?.analysisName || item?.name,
                      };
                    })}
                    onChange={(v) => {
                      setAnalizId({ ...analizId, [id]: v });
                      setNewAnaliz((prev) => removeDuplicates([...prev, ...v]));
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
              Buyurtma o`zgartirish
            </Button>
          </div>
        </form>
      </div>
    </CreateOrderWrapper>
  );
};

export default UpdateOrder;
