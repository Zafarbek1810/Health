import React, { useEffect, useState } from "react";
import {
  ModalContent,
  ModalHeader,
  AddViloyatWrapper,
} from "../AddViloyat/style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";
import RegionProvider from "../../../../../../Data/RegionProvider";
import { toast } from "react-toastify";

const EditViloyat = ({ onCloseModal2, editViloyat }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue("regionName", editViloyat.name);
  }, [editViloyat]);

  const onSubmitRegion = async (values) => {
    const body = {};
    body.regionName = values.regionName;
    body.id = editViloyat.id;

    setLoading(true);
    RegionProvider.updateRegion(body)
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
    <AddViloyatWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Viloyat o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
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
            O`zgartirish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddViloyatWrapper>
  );
};

export default EditViloyat;
