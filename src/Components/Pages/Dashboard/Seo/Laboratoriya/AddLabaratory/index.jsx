import React, { useState } from "react";
import { AddLabaratoryWrapper, ModalContent, ModalHeader } from "./style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { toast } from "react-toastify";

const AddLabaratory = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitLaboratory = async (values) => {
    const body = {};
    body.laboratoryName = values.laboratoryName;

    setLoading(true);
    LabaratoryProvider.createLaboratory(body)
      .then((res) => {
        reset();
        toast.success("Qo'shildi");
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
    <AddLabaratoryWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Laboratoriya qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitLaboratory)}
        >
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Laboratoriya nomi"}
              {...register("laboratoryName", { required: true })}
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
    </AddLabaratoryWrapper>
  );
};

export default AddLabaratory;
