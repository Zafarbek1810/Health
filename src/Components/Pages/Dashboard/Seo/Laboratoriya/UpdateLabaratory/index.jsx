import React, { useEffect, useState } from "react";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { toast } from "react-toastify";
import { ModalContent, ModalHeader } from "../AddLabaratory/style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";

const UpdateLabaratory = ({ onCloseModal2, editLaboratory }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue("laboratoryName", editLaboratory.name);
  }, [editLaboratory]);

  const onSubmitLaboratory = async (values) => {
    const body = {};
    body.laboratoryName = values.laboratoryName;
    body.id = editLaboratory.id;

    setLoading(true);
    LabaratoryProvider.updateLaboratory(body)
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
        <h2 className="title">Laboratoriya o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
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
            O`zgartirish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </div>
  );
};

export default UpdateLabaratory;
