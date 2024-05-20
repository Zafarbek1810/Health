import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { toast } from "react-toastify";
import ContractProvider from "../../../../../../Data/ContractProvider";
import { ModalContent, ModalHeader } from "../AddSanMin/style";
import SanMinProvider from "../../../../../../Data/SanMinProvider";
import { PatternFormat } from "react-number-format";

const UpdateSanMin = ({ onCloseModal2, editContract }) => {
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
    setValue("fullName", editContract.fullName);
    setValue("phoneNumber", editContract.phoneNumber);
    setValue("workplace", editContract.workplace);
    setValue("coursePrice", editContract.coursePrice);
  }, [editContract]);

  const onSubmit = async (values) => {
    const body = {};
    body.fullName = values.fullName;
    body.phoneNumber = values.phoneNumber.replace(/\s/g, "");
    body.workplace = values.workplace;
    body.coursePrice = values.coursePrice;
    body.paymentType = paymentId;
    body.id = editContract.id;

    setLoading(true);
    SanMinProvider.updateSanMin(body)
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
        <h2 className="title">San.minimum o`zgartirish</h2>
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
            <label>Ism Familyasi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Ism Familyasi"}
              {...register("fullName", { required: true })}
            />
          </div>
           <div className="label">
           <label>Telefon raqami</label>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <PatternFormat
                  format="+998(##) ### ## ##"
                  className="form-control"
                  mask="_" 
                  name="phoneNumber"
                  allowEmptyFormatting
                  value={value}
                  style={{ width: "100%" }}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </div>
           <div className="label">
            <label>Kurs narxi</label>
            <input
              autoComplete="off"
              type="number"
              className="form-control"
              placeholder={"Kurs narxi"}
              {...register("coursePrice", { required: true })}
            />
          </div>
          <div className="label">
            <label>Ish joyi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Ish joyi"}
              {...register("workplace", { required: true })}
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

export default UpdateSanMin;
