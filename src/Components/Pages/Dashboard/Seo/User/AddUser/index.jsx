import React, { useEffect, useState } from "react";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, set, useForm } from "react-hook-form";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { DrawerWrapper, ModalContent, ModalHeader } from "./style";
import Select from "react-select";
import UserProvider from "../../../../../../Data/UserProvider";
import CompanyProvider from "../../../../../../Data/CompanyProvider";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import { toast } from "react-toastify";
import { PatternFormat } from "react-number-format";

const AddUser = ({ onCloseModal }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [roleType, setRoleType] = useState({});
  const [companyValue, setCompanyValue] = useState({});
  const [labaratoriyaValue, setLabaratoriyaValue] = useState({});
  const [phoneValue, setPhoneValue] = useState({});
  const [company, setCompany] = useState([]);
  const [labaratory, setLabaratory] = useState([]);

  useEffect(() => {
    CompanyProvider.getAllCompany()
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    LabaratoryProvider.getAllLaboratory()
      .then((res) => {
        setLabaratory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmitUser = async (values) => {
    console.log(values);
    const body = {};
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.username = values.username;
    body.password = values.password;
    body.roleType = roleType.value;
    body.phoneNumber = values.phoneNumber;
    body.companyId = companyValue.value;
    body.laboratoryId = labaratoriyaValue.value;
    body.telegramUsername = values.telegramUsername;
    body.email = "zafar@gmail.com";

    console.log("body", values);
    setLoading(true);
    UserProvider.createUser(body)
      .then((res) => {
        toast.success("Qo'shildi");
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

  const options = [
    // { value: 2, label: "Admin" },
    { value: 3, label: "Direktor" },
    { value: 4, label: "Kassir" },
    { value: 5, label: "Laborant" },
  ];

  const optionCompany = company?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const optionLabaratoriya = labaratory?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  return (
    <DrawerWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Foydalanuvchi qo`shish</h2>
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
            <label>Username</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Username"}
              {...register("username", { required: true })}
            />
          </div>
          <div className="label">
            <label>Telegram Username</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Telegram Username"}
              {...register("telegramUsername", { required: false })}
            />
          </div>
          <div className="label">
            <label>Parol</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Parol"}
              {...register("password", { required: true })}
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
            <label>Lavozimi</label>
            <Controller
              control={control}
              name="lavozim"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Lavozimi"
                  options={options}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setRoleType(v);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Company</label>
            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Company"
                  options={optionCompany}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setCompanyValue(v);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          {roleType.value === 5 || roleType.value === 3 ? (
            <div className="label">
              <label>Labaratoriya</label>
              <Controller
                control={control}
                name="labaratory"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    className="select col-3 w-100"
                    value={value}
                    placeholder="Laboratoriya"
                    options={optionLabaratoriya}
                    onBlur={onBlur}
                    onChange={(v) => {
                      onChange(v);
                      setLabaratoriyaValue(v);
                    }}
                    ref={ref}
                  />
                )}
              />
            </div>
          ) : null}
          <button
            type="submit"
            className="btn btn-success btn-rounded m-1"
            style={{ display: "flex" }}
          >
            Qo`shish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </DrawerWrapper>
  );
};

export default AddUser;
