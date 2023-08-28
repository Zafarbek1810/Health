import React, { useEffect, useState } from "react";
import { ModalContent, ModalHeader } from "../AddPatient/style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import RegionProvider from "../../../../../../Data/RegionProvider";
import DistrictProvider from "../../../../../../Data/DistrictProvider";
import PatientProvider from "../../../../../../Data/PatientProvider";
import { toast } from "react-toastify";

const UpdatePatient = ({ onCloseModal2, editPatient }) => {
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


  useEffect(() => {
    setValue("firstName", editPatient.first_name);
    setValue("lastName", editPatient.last_name);
    setValue("phoneNumber", editPatient.phone_number);
    setValue("birthDay", editPatient.birthDay);
    setValue("address", editPatient.address);
    setValue("officeName", editPatient.office_name);
    setValue("contract", editPatient.contract);
    setValue("privilege", editPatient.privilege);
    setValue("comment", editPatient.comment);
    setValue("region", {
        value: editPatient.region.id,
        label: editPatient.region.name,
        });
    setValue("district", {
        value: editPatient.district.id,
        label: editPatient.district.name,
        });
  }, [editPatient]);

  const onSubmitPatient = async (values) => {
    const body = {};
    body.id = editPatient.id;
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

    setLoading(true);
    PatientProvider.updatePatient(body)
      .then((res) => {
        toast.success(res.data?.message);
        onCloseModal2();
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
    <>
      <ModalHeader className="modal-header">
        <h2 className="title">Bemor o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitPatient)}
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
              {...register("address", { required: true })}
            />
          </div>
          <div className="label">
            <label>officeName</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"officeName"}
              {...register("officeName", { required: true })}
            />
          </div>
          <div className="label">
            <label>contract</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"contract"}
              {...register("contract", { required: true })}
            />
          </div>
          <div className="label">
            <label>privilege</label>
            <input
              autoComplete="off"
              className="form-control"
              type="number"
              placeholder={"privilege"}
              {...register("privilege", { required: true })}
            />
          </div>
          <div className="label">
            <label>comment</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"comment"}
              {...register("comment", { required: true })}
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

export default UpdatePatient;
