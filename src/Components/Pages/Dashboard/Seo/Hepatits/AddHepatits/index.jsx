import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddVirusWrapper } from "./style";
import { ModalContent, ModalHeader } from "../../Viloyat/AddViloyat/style";
import Select from "react-select";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import VirusologyProvider from "../../../../../../Data/VirusologyProvider";
import HepatitProvider from "../../../../../../Data/HepatitProvider";

const AddHepatit = ({ onCloseModal }) => {
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

  const onSubmit = async (values) => {
    const body = {};
    body.name = values.name;
    body.type = values.type;
    body.laboratoryId = labaratoryId;

    setLoading(true);
    HepatitProvider.createHepatits(body)
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
        <h2 className="title">Gepatit qo`shish</h2>
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
            <label>Laboratory</label>
            <Controller
              control={control}
              name="region"
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
              placeholder={"Gepatit nomi"}
              {...register("name", { required: true })}
            />
          </div>
          <div className="label">
            <label>Tipi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Tipi"}
              {...register("type", { required: true })}
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

export default AddHepatit;
