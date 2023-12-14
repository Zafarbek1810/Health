import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import RegionProvider from "../../../../../../Data/RegionProvider";
import { toast } from "react-toastify";
import { AddDistrictWrapper } from "./style";
import { ModalContent, ModalHeader } from "../../Viloyat/AddViloyat/style";
import Select from "react-select";
import DistrictProvider from "../../../../../../Data/DistrictProvider";

const AddDistrict = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [regionId, setRegionId] = useState(null);
  const [region, setRegion] = useState([]);

  useEffect(() => {
    RegionProvider.getAllRegion()
      .then((res) => {
        setRegion(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const optionRegion = region?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const onSubmitDistrict = async (values) => {
    const body = {};
    body.districtName = values.districtName;
    body.regionId = regionId;

    setLoading(true);
    DistrictProvider.createDistrict(body)
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
    <AddDistrictWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Tuman qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
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
            <label>Viloyat</label>
            <Controller
              control={control}
              name="region"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Viloyatni tanlang"
                  options={optionRegion}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setRegionId(v.value);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Tuman nomi"}
              {...register("districtName", { required: true })}
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
    </AddDistrictWrapper>
  );
};

export default AddDistrict;
