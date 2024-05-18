import React, { useEffect, useState } from "react";
import CreateOrderWrapper from "./style";
import AnalizProvider from "../../../../../../Data/AnalizProvider";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { Controller, useForm } from "react-hook-form";
import { Select, Button } from "antd";
import MyLink from '../../../../../../Components/Common/MyLink'
import OrderProvider from "../../../../../../Data/OrderProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AnalizPriceProvider from "../../../../../../Data/AnalizPriceProvider";

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
  const [data, setData] = useState([]);
  const [submittable, setSubmittable] = React.useState(false);

  function filterByLaboratoryId(dataArray, numbers) {
    const filteredArray = dataArray.filter((item) =>
      numbers.includes(item.laboratoryId)
    );

    return filteredArray;
  }

  useEffect(() => {
    AnalizPriceProvider.getAllPrices({ ids: Object.values(analizId).flat() })
      .then((res) => {
        setChangeAnaliz(
          filterByLaboratoryId(res.data.data.allDTOList, laboratoryId)
        );
        console.log(res.data.data.allDTOList, "all");
        setCommonSum(res.data.data.sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newAnaliz, laboratoryId, analizId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const promises = laboratoryId.map(async (id) => {
  //         const res = await AnalizProvider.getAllAnalysisByLabWithPrice(id);
  //         setAnaliz((prevAnaliz) => ({ ...prevAnaliz, [id]: res.data.data }));
  //       });

  //       await Promise.all(promises);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, [laboratoryId, analizId]);

  useEffect(() => {
    laboratoryId.map((id) =>
      AnalizProvider.getAllAnalysisByLabWithPrice(id)
        .then((res) => {
          setAnaliz((prevAnaliz) => ({ ...prevAnaliz, [id]: res.data.data }));
        })
        .catch((err) => {
          console.log(err);
        })
    );
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

    setSubmittable(true);
    router.push(`/dashboard/operator/order`);
    OrderProvider.saveDetailOrder(body)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Barcha maydonlarni to'ldiring!");
      }).finally(()=>{
        setSubmittable(false)
      })
  };

  useEffect(() => {
    if (id) {
      OrderProvider.getOrdersById(id)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);


  return (
    <CreateOrderWrapper>
      <div className="top">
      <MyLink to="/dashboard/operator/order/">Orqaga</MyLink>
      <h3>Buyurtma yaratish</h3>
      </div>
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
                  setAnalizId((prev) => {
                    return Object.fromEntries(
                      Object.entries(prev).filter(([lid, analid]) => {
                        return v.includes(+lid);
                      })
                    );
                  });
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
              console.log();
              return (
                <div className="analiz" style={{ marginBottom: 30 }} key={id}>
                  <div className="analizName">
                    {laboratory.filter((i) => i.id === id)[0].name}
                  </div>
                  <Select
                    size="large"
                    mode="multiple"
                    className="select w-100"
                    placeholder="Analiz tanlang"
                    value={analizId[id] ?? []}
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
              class="w-100 btn btn-primary btn-rounded"
              type="primary"
              htmlType="submit"
              disabled={changeAnaliz.length === 0 || submittable}
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
