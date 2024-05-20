import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { toast } from "react-toastify";
import { ModalContent, ModalHeader } from "../AddContract/style";
import ContractProvider from "../../../../../../Data/ContractProvider";

const UpdateContract = ({ onCloseModal2, editContract }) => {
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

  useEffect(() => {
    setValue("objectName", editContract.objectName);
    setValue("contractAmount", editContract.contractAmount);
    setValue("contractNumber", editContract.contractNumber);
    setValue("specialistName", editContract.specialistName);
  }, [editContract]);

  const onSubmit = async (values) => {
    const body = {};
    body.objectName = values.objectName;
    body.contractAmount = values.contractAmount;
    body.contractNumber = values.contractNumber;
    body.specialistName = values.specialistName;
    body.paymentType = paymentId;
    body.id = editContract.id;

    setLoading(true);
    ContractProvider.updateContract(body)
      .then((res) => {
        reset();
        toast.success("Muvaqqiyatli o`zgartirildi!");
        onCloseModal2();
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
    <div>
      <ModalHeader className="modal-header">
        <h2 className="title">Shartnoma o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
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
            O`zgartirish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </div>
  );
};

export default UpdateContract;
