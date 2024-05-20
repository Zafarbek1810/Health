import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { toast } from "react-toastify";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { ModalContent, ModalHeader } from "../AddMicroorganism/style";
import VirusologyProvider from "../../../../../../Data/VirusologyProvider";
import MicroOrganismProvider from "../../../../../../Data/MicroOrganismProvider";

const UpdateMicroorganism = ({ onCloseModal2, editMicroorganism }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [labaratoryId, setLabaratoryId] = useState(null);

  useEffect(() => {
    setValue("name", editMicroorganism.name);
  }, [editMicroorganism]);

  const onSubmit = async (values) => {
    const body = {};
    body.name = values.name;
    body.id = editMicroorganism.id;

    setLoading(true);
    MicroOrganismProvider.updateMicroorganism(body)
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
        <h2 className="title">Mikroorganizm o`zgartirish</h2>
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
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Mikroorganizm nomi"}
              {...register("name", { required: true })}
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

export default UpdateMicroorganism;
