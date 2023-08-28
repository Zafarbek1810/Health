import React, { useState } from "react";
import {  AddAntibioticWrapper, ModalContent, ModalHeader } from "./style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";
import AntibioticProvider from "../../../../../../Data/AntibioticProvider";
import { toast } from "react-toastify";

const AddAntibiotic = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitAntibiotic = async (values) => {
    const body = {};
    body.name = values.name;

    setLoading(true);
    AntibioticProvider.createAntibiotic(body)
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
    <AddAntibioticWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Antibiotik qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitAntibiotic)}
        >
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Antibiotik nomi"}
              {...register("name", { required: true })}
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
    </AddAntibioticWrapper>
  );
};

export default AddAntibiotic;
