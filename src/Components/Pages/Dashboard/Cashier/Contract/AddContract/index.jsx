import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddVirusWrapper, ModalContent, ModalHeader } from "./style";
import Select from "react-select";
import ContractProvider from "../../../../../../Data/ContractProvider";

const AddContract = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState(null);

 

  const optionPayment = [
    {
      value:'CASH',
      label:'Naqd'
    },
    {
      value:'CARD',
      label:'Plastik'
    },
    {
      value:'TRANSFER',
      label:'Hisobdan o`tkazish'
    },
  ];

  const onSubmit = async (values) => {
    const body = {};
    body.objectName = values.objectName;
    body.contractAmount = values.contractAmount;
    body.contractNumber = values.contractNumber;
    body.specialistName = values.specialistName;
    body.paymentType = paymentId;

    setLoading(true);
    ContractProvider.createContract(body)
      .then((res) => {
        reset();
        toast.success(res?.data?.message);
        onCloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AddVirusWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Shartnoma qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmit)}
        >
           <div className="label">
            <label>Object nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Object nomi"}
              {...register("objectName", { required: true })}
            />
          </div>
           <div className="label">
            <label>Shartnoma raqami</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Shartnoma raqami"}
              {...register("contractNumber", { required: true })}
            />
          </div>
           <div className="label">
            <label>Shartnoma summasi</label>
            <input
              autoComplete="off"
              type="number"
              className="form-control"
              placeholder={"Shartnoma summasi"}
              {...register("contractAmount", { required: true })}
            />
          </div>
          <div className="label">
            <label>Shartnoma tuzgan hodim</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Shartnoma tuzgan hodim"}
              {...register("specialistName", { required: true })}
            />
          </div>
          <div className="label">
            <label>To`lov turi</label>
            <Controller
              control={control}
              name="region"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="To'lov turini tanlang"
                  options={optionPayment}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setPaymentId(v.value);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary btn-rounded m-1"
            style={{ display: "flex" }}
          >
            Qo`shish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddVirusWrapper>
  );
};

export default AddContract;
