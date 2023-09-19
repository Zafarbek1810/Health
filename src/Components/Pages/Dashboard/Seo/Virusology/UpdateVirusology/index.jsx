import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { toast } from "react-toastify";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { ModalContent, ModalHeader } from "../AddVirusology/style";
import VirusologyProvider from "../../../../../../Data/VirusologyProvider";

const Updatevirus = ({ onCloseModal2, editVirus }) => {
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
    setValue("virusName", editVirus.virus_name);
  }, [editVirus]);

  const onSubmitVirus = async (values) => {
    const body = {};
    body.virusName = values.virusName;
    body.laboratoryId = labaratoryId;
    body.id = editVirus.id;

    setLoading(true);
    VirusologyProvider.updateVirus(body)
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
        <h2 className="title">Virus o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitVirus)}
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
              placeholder={"Virus nomi"}
              {...register("virusName", { required: true })}
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

export default Updatevirus;
