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
import { Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";

const UpdatePatient = ({ onCloseModal2, editPatient, setRender }) => {
  const { register, handleSubmit, control, reset, setValue, getValues } =
    useForm();
  const [patientEdit, setPatientEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState([]);
  const [district, setDistrict] = useState([]);
  const [regionId, setRegionId] = useState({
    value: editPatient.region?.id,
    label: editPatient.region?.name,
  });
  const [isSendSms, setIsSendSms] = useState(false);

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
    DistrictProvider.getDistrictByRegionId(regionId.value)
      .then((res) => {
        setDistrict(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [regionId]);

  useEffect(() => {
    PatientProvider.getOnePatient(editPatient.id)
      .then((res) => {
        console.log(res.data.data);
        setPatientEdit(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [editPatient]);

  useEffect(() => {
    setValue("firstName", editPatient.first_name);
    setValue("lastName", editPatient.last_name);
    setValue("phoneNumber", editPatient.phone_number);
    setValue("birthDay", editPatient.birth_day);
    setValue("address", editPatient.address);
    setValue("officeName", editPatient.office_name);
    setValue("contract", editPatient.contract);
    setValue("privilege", editPatient.privilege);
    setValue("comment", editPatient.comment);
    setValue("region", {
      value: editPatient?.region?.id,
      label: editPatient?.region?.name,
    });
    setValue("district", {
      value: editPatient?.district?.id,
      label: editPatient?.district?.name,
    });
  }, []);

  console.log(editPatient.birth_day);

  const [birthday, setBirthday] = useState("");
  const onChange = (date, dateString) => {
    setBirthday(dateString);
  };

  const onSubmitPatient = async (values) => {
    const body = {};
    if (editPatient) {
      body.id = editPatient.id;
      body.firstName = values.firstName;
      body.lastName = values.lastName;
      body.phoneNumber = values.phoneNumber;
      body.regionId = editPatient?.region?.id;
      body.districtId = editPatient?.district?.id;
      body.birthDay = birthday;
      body.address = values.address;
      body.officeName = values.officeName;
      body.contract = values.contract;
      body.privilege = values.privilege;
      body.comment = values.comment;
      body.isSendSms = isSendSms;
    }

    setLoading(true);
    PatientProvider.updatePatient(body)
      .then((res) => {
        toast.success("Muvaffaqiyatli o`zgartirildi");
        onCloseModal2();
        reset();
        setRender(Math.random());
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
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Tug`ilgan kun</label>
            {/* <input
              type="date"
              className="form-control"
              placeholder={"Tug`ilgan kun"}
              format={'DD.MM.YYYY'}
              {...register("birthDay")}
            /> */}
            {editPatient.birth_day ? (
              <DatePicker
                defaultValue={dayjs(editPatient.birth_day, "YYYY-MM-DD")}
                size="small"
                onChange={onChange}
                format={"DD.MM.YYYY"}
              />
            ) : (
              <DatePicker
                size="small"
                onChange={onChange}
                format={"DD.MM.YYYY"}
              />
            )}
          </div>
          <div className="label">
            <label>Telefon raqami</label>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <PatternFormat
                  format="+998(##) ### ## ##"
                  mask="_"
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
          {/* <div className="label">
            <label>Contract</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Contract"}
              {...register("contract", { required: false })}
            />
          </div> */}
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
            <label></label>
            <Checkbox
              defaultChecked={editPatient.isSendSms}
              onChange={(e) => setIsSendSms(e.target.checked)}
            >
              Sms yuboriladimi?
            </Checkbox>
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
    </>
  );
};

export default UpdatePatient;
