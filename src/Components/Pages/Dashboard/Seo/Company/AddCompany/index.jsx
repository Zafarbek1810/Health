import React, { useState } from "react";
import AddCompanyWrapper from "./style";
import { ModalContent, ModalHeader } from "../../User/AddUser/style";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import CompanyProvider from "../../../../../../Data/CompanyProvider";
import { toast } from "react-toastify";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";

const AddCompany = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitCompany = async (values) => {
    const body = {};
    body.companyName = values.companyName;

    setLoading(true);
    CompanyProvider.createCompany(body)
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
    <AddCompanyWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Company qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitCompany)}
        >
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Company nomi"}
              {...register("companyName", { required: true })}
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
    </AddCompanyWrapper>
  );
};

export default AddCompany;
