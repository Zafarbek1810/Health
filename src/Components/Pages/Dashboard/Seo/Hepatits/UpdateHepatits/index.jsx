import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { toast } from "react-toastify";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { ModalContent, ModalHeader } from "../AddHepatits/style";
import VirusologyProvider from "../../../../../../Data/VirusologyProvider";
import HepatitProvider from "../../../../../../Data/HepatitProvider";

const UpdateHepatit = ({ onCloseModal2, editHepatit }) => {
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

  useEffect(() => {
    setValue("name", editHepatit.name);
    setValue("type", editHepatit.type);
  }, [editHepatit]);

  const onSubmit = async (values) => {
    const body = {};
    body.name = values.name;
    body.type = values.type;
    body.laboratoryId = labaratoryId;
    body.id = editHepatit.id;

    setLoading(true);
    HepatitProvider.updateHepatits(body)
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
        <h2 className="title">Gepatit o`zgartirish</h2>
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
              placeholder={"Gepatit tipi"}
              {...register("type", { required: true })}
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

export default UpdateHepatit;
