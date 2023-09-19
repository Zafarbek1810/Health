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

const CreateOrder = ({ id }) => {
    const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [analiz, setAnaliz] = useState([]);
  const [laboratory, setLaboratory] = useState([]);
  const [analizId, setAnalizId] = useState([]);
  const [laboratoryId, setLaboratoryId] = useState([]);
  const [paymentId, setPaymentId] = useState([]);

  useEffect(() => {
    AnalizProvider.getAllAnalysisByLab(laboratoryId)
      .then((res) => {
        setAnaliz(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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

  const optionAnaliz = analiz?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

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
    body.laboratoryId = laboratoryId;
    body.analysisIds = analizId;
    body.formPayment = paymentId;
    body.orderId = +id;

    OrderProvider.saveDetailOrder(body)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        router.push(`/dashboard/cashier/order`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CreateOrderWrapper>
      <div className="top">Buyurtma yaratish</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          className="select col-3 w-100"
          placeholder="Labaratoriya tanlang"
          options={optionLaboratory}
          onChange={(v) => {
            setLaboratoryId(v);
          }}
        />
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          onChange={(v) => setAnalizId(v)}
          options={optionAnaliz}
        />
        <Select
          className="select col-3 w-100"
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
    </CreateOrderWrapper>
  );
};

export default CreateOrder;
