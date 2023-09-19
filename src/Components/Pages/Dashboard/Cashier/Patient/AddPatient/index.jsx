import React, { useEffect, useState } from "react";
import { AddPatientWrapper, ModalContent, ModalHeader } from "./style";
import PatientProvider from "../../../../../../Data/PatientProvider";
import RegionProvider from "../../../../../../Data/RegionProvider";
import DistrictProvider from "../../../../../../Data/DistrictProvider";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { toast } from "react-toastify";
import moment from "moment";

const AddPatient = ({onCloseModal}) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [regionId, setRegionId] = useState({});
  const [districtId, setDistrictId] = useState({});
  const [region, setRegion] = useState([]);
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    RegionProvider.getAllRegion()
      .then((res) => {
        setRegion(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    DistrictProvider.getAllDistrict()
      .then((res) => {
        setDistrict(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmitUser = async (values) => {
    const body = {};
    console.log("values", values);
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.phoneNumber = values.phoneNumber;
    body.regionId = regionId.value;
    body.districtId = districtId.value;
    body.birthDay = values.birthDay;
    body.address = values.address;
    body.officeName = values.officeName;
    body.contract = values.contract;
    body.privilege = values.privilege;
    body.comment = values.comment;
    

    console.log("body", body);
    setLoading(true);
    PatientProvider.createPatient(body)
      .then((res) => {
        toast.success(res.data?.message);
        onCloseModal();
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const optionRegion = region?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const optionDistrict = district?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  return (
    <AddPatientWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Bemor qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitUser)}
        >
          <div className="label">
            <label>Ismi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Ismi"}
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="label">
            <label>Familyasi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Familyasi"}
              {...register("lastName", { required: true })}
            />
          </div>
          <div className="label">
            <label>Viloyat</label>
            <Controller
              control={control}
              name="region"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Viloyat"
                  options={optionRegion}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setRegionId(v);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Tumanlar</label>
            <Controller
              control={control}
              name="district"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Tuman"
                  options={optionDistrict}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setDistrictId(v);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Tug`ilgan kun</label>
            <input
              type="date"
              className="form-control"
              placeholder={"Tug`ilgan kun"}
              {...register("birthDay")}
            />
          </div>
          <div className="label">
            <label>Telefon raqami</label>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <PatternFormat
                  format="+998## ### ## ##"
                  className="form-control"
                  name="phoneNumber"
                  allowEmptyFormatting
                  value={value}
                  style={{ width: "100%" }}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Manzil</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Manzil"}
              {...register("address", { required: false })}
            />
          </div>
          <div className="label">
            <label>Ish joyi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Ish joyi"}
              {...register("officeName", { required: false })}
            />
          </div>
          <div className="label">
            <label>Contract</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Contract"}
              {...register("contract", { required: false })}
            />
          </div>
          <div className="label">
            <label>Chegirma</label>
            <input
              autoComplete="off"
              className="form-control"
              type="number"
              placeholder={"Chegirma"}
              {...register("privilege", { required: false })}
            />
          </div>
          <div className="label">
            <label>Izoh</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Izoh"}
              {...register("comment", { required: false })}
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
    </AddPatientWrapper>
  );
};

export default AddPatient;
