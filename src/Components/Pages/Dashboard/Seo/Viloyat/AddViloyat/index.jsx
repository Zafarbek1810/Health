import React, { useState } from "react";
import { ModalContent, ModalHeader, AddViloyatWrapper } from "./style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";
import RegionProvider from "../../../../../../Data/RegionProvider";
import { toast } from "react-toastify";

const AddViloyat = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitRegion = async (values) => {
    const body = {};
    body.regionName = values.regionName;

    setLoading(true);
    RegionProvider.createRegion(body)
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
    <AddViloyatWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Viloyat qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitRegion)}
        >
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Viloyat nomi"}
              {...register("regionName", { required: true })}
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
    </AddViloyatWrapper>
  );
};

export default AddViloyat;
