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

  const [laboratory, setLaboratory] = useState([]);
  const [defaultLab, setDefaultLab] = useState([]);

  const [paymentId, setPaymentId] = useState();
  const [commonSum, setCommonSum] = useState("");

  const [changeAnaliz, setChangeAnaliz] = useState([]);

  const [analiz, setAnaliz] = useState(null);
  const [laboratoryId, setLaboratoryId] = useState([]);
  const [data, setData] = useState(null);
  const [newAnaliz, setNewAnaliz] = useState({});
  const [defaultResult, setDefaultResult] = useState([]);



  useEffect(() => {
    if (defaultLab && defaultLab.length > 0) {
      let allAnaliz = []
      defaultLab.map((id) => {
        if (newAnaliz[id]) {
          allAnaliz = [...allAnaliz, ...newAnaliz[id]]
        }
      })
      allAnaliz = removeDuplicates(allAnaliz)
      AnalizPriceProvider.getAllPrices({ ids: allAnaliz })
        .then((res) => {
          if (res.data.success) {
            setChangeAnaliz(res.data.data.allDTOList);
            console.log('newAnaliz', res.data.data.allDTOList);
            setCommonSum(res.data.data.sum);
          } else {
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!defaultLab || defaultLab.length === 0) {
      setChangeAnaliz([])
      setData(prev => ({ ...prev, orderDetailMap: {} }))
    }

  }, [newAnaliz, defaultLab]);



  useEffect(() => {
    if (id) {
      OrderProvider.getOrdersById(id)
        .then((res) => {
          setData(res.data.data);
          setPaymentId(res.data.data?.paymentType);
          for (const [key, value] of Object.entries(res.data.data.orderDetailMap)) {
            setNewAnaliz(prev => ({ ...prev, [key]: value.map(obj => obj.analysisId) }));
          }
          console.log('res.data.data.orderDetailDTOList', res.data.data);
          getDefaultLab();
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

    let allAnaliz = []
    defaultLab.map((id) => {
      if (newAnaliz[id]) {
        allAnaliz = [...allAnaliz, ...newAnaliz[id]]
      }
    })
    allAnaliz = removeDuplicates(allAnaliz)

    const body = {
      formPayment: paymentId,
      analysisIds: allAnaliz
    };

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

  const renderAnalyzList = (
    <div className="redult-bottom">
      {changeAnaliz.length > 0 &&
        changeAnaliz.map((item) => {
          return (
            <div key={item.id} className="analiz-result">
              <div className="name">{item?.name || item?.analysisName}</div>
              <div className="price">{item.price}</div>
            </div>
          );
        })}
    </div>
  )

  if (!data?.orderDetailDTOList || !defaultLab || !analiz) {
    return <div>Loading ...</div>;
  }
  console.log('analizObj', analiz);
  return (
    <CreateOrderWrapper>
      {console.log('changeAnaliz', changeAnaliz, defaultLab)}
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
                value={defaultLab}
                className="select w-100"
                placeholder="Labaratoriya tanlang"
                options={optionLaboratory}
                onChange={(v) => {
                  setDefaultLab(v);
                }}
              />
            </div>

            <div>
              <label>
                To`lov turi<span className="span">*</span>
                <Select
                  size="large"
                  value={paymentId}
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
              {renderAnalyzList}
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
                    // defaultValue={getDefaultAnalysis(id)}
                    value={newAnaliz[id]}
                    className="select w-100"
                    placeholder="Analiz tanlang"
                    options={analiz[id]?.map((item) => {
                      return {
                        value: item?.id,
                        label: item?.analysisName || item?.name,
                      };
                    })}
                    onChange={(v) => {
                      setNewAnaliz({ ...newAnaliz, [id]: v });
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
