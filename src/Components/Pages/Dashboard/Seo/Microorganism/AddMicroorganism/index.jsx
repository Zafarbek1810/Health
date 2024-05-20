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
import MicroOrganismProvider from "../../../../../../Data/MicroOrganismProvider";

const AddMicroorganism = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    const body = {};
    body.name = values.name;

    setLoading(true);
    MicroOrganismProvider.createMicroorganism(body)
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
        <h2 className="title">Mikroorganizm qo`shish</h2>
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
            Qo`shish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddVirusWrapper>
  );
};

export default AddMicroorganism;
