import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalContent, ModalHeader } from "../AddAntibiotic/style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";
import AntibioticProvider from "../../../../../../Data/AntibioticProvider";

const UpdateAntibiotic = ({ onCloseModal2, editAntibiotic }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue("name", editAntibiotic.name);
  }, [editAntibiotic]);

  const onSubmitAntibiotic = async (values) => {
    const body = {};
    body.name = values.name;
    body.id = editAntibiotic.id;

    setLoading(true);
    AntibioticProvider.updateAntibiotic(body)
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
        <h2 className="title">Antibiotik o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
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

export default UpdateAntibiotic;
