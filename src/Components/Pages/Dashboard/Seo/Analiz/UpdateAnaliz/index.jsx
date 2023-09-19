import React, { useEffect, useState } from "react";
import { ModalContent, ModalHeader } from "../AddAnaliz/style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import AnalizProvider from "../../../../../../Data/AnalizProvider";
import { toast } from "react-toastify";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";

const UpdateAnaliz = ({ onCloseModal2, editAnaliz }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [labaratoryId, setLabaratoryId] = useState(null);
  const [labaratory, setLabaratory] = useState([]);

  useEffect(() => {
    LabaratoryProvider.getAllLaboratory()
      .then((res) => {
        setLabaratory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const optionLabaratory = labaratory?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  console.log(editAnaliz);

  useEffect(() => {
    setValue("name", editAnaliz.name);
    setValue("labaratory", {
      value: editAnaliz.laboratory?.id,
      label: editAnaliz.laboratory?.name,
    });
  }, [editAnaliz]);

  const onSubmitLabaratory = async (values) => {
    const body = {};
    body.name = values.name;
    body.laboratoryId = editAnaliz.laboratory?.id;
    body.id = editAnaliz.id;

    setLoading(true);
    AnalizProvider.updateAnalysis(body)
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
        <h2 className="title">Analiz o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitLabaratory)}
        >
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Analiz nomi"}
              {...register("name", { required: true })}
            />
          </div>
          <div className="label">
            <label>Laboratory</label>
            <Controller
              control={control}
              name="labaratory"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Laboratoryni tanlang"
                  options={optionLabaratory}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setLabaratoryId(v.value);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success btn-rounded m-1"
            style={{ display: "flex" }}
          >
            O`zgartirish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </div>
  );
};

export default UpdateAnaliz;
