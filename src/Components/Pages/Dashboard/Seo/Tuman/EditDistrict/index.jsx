import React, { useEffect, useState } from "react";
import { ModalContent, ModalHeader } from "../../Viloyat/AddViloyat/style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { useForm } from "react-hook-form";
import DistrictProvider from "../../../../../../Data/DistrictProvider";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../../Common/ButtonLoader";

const EditDistrict = ({ onCloseModal2, editTuman }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue("districtName", editTuman.name);
    }, [editTuman]);

  const onSubmitDistrict = async (values) => {
    const body = {};
    body.districtName = values.districtName;
    body.regionId = editTuman.region?.id;
    body.id = editTuman.id;

    setLoading(true);
    DistrictProvider.updateDistrict(body)
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
    <>
      <ModalHeader className="modal-header">
        <h2 className="title">Tuman tahrirlash</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitDistrict)}
        >
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Company nomi"}
              {...register("districtName", { required: true })}
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
    </>
  );
};

export default EditDistrict;
