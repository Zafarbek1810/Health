import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, set, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddBacteriaWrapper } from "./style";
import { ModalContent, ModalHeader } from "../../Viloyat/AddViloyat/style";
import Select from "react-select";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";

const AddBacteria = ({ onCloseModal }) => {
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

  const onSubmitBacteria = async (values) => {
    const body = {};
    body.bacteriaName = values.bacteriaName;
    body.laboratoryId = labaratoryId;

    setLoading(true);
    BacteriaProvider.createBacteria(body)
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
    <AddBacteriaWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Bakteriya qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitBacteria)}
        >
          <div className="label">
            <label>Laboratory</label>
            <Controller
              control={control}
              name="laboratory"
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
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Bakteriya nomi"}
              {...register("bacteriaName", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success btn-rounded m-1"
            style={{ display: "flex" }}
          >
            Qo`shish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddBacteriaWrapper>
  );
};

export default AddBacteria;
