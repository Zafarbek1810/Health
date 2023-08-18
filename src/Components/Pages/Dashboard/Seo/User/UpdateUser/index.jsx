import React, { useEffect, useState } from "react";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import Select from "react-select";
import UserProvider from "../../../../../../Data/UserProvider";
import CompanyProvider from "../../../../../../Data/CompanyProvider";
import { toast } from "react-toastify";
import { PatternFormat } from "react-number-format";
import { DrawerWrapper, ModalContent, ModalHeader } from "../AddUser/style";

const UpdateUser = ({ onCloseModal2, editUser }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [roleType, setRoleType] = useState({});
  const [companyValue, setCompanyValue] = useState({});
  const [company, setCompany] = useState(null);

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
    setValue("firstName", editUser.firstName);
    setValue("lastName", editUser.lastName);
    setValue("username", editUser.username);
    setValue("password", editUser.password);
    setValue("phoneNumber", editUser.phoneNumber.slice(4));
    setValue("telegramUsername", editUser.telegramUsername);
    setRoleType({ value: editUser.roleType, label: editUser.roleType });
    setCompanyValue({ value: editUser.companyId, label: editUser.companyName });
    }, [editUser]);

  const onSubmitEditUser = async (values) => {
    const body = {};
    body.id = editUser.id;
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.username = values.username;
    body.password = values.password;
    body.roleType = roleType.value;
    body.phoneNumber = values.phoneNumber;
    body.companyId = companyValue.value;
    body.telegramUsername = values.telegramUsername;

    setLoading(true);
    UserProvider.updateUser(body)
      .then((res) => {
        toast.success("Muvaffaqiyatli o'zgartirildi");
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

  const options = [
    { value: 2, label: "Admin" },
    { value: 3, label: "Direktor" },
  ];

  const optionCompany = company?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  return (
    <DrawerWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Foydalanuvchi o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitEditUser)}
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
              {...register("telegramUsername", { required: true })}
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
              rules={{
                required: true,
                minLength: 16,
                maxLength: 16,
              }}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <PatternFormat
                  format="+998#########"
                  className="form-control"
                  allowEmptyFormatting
                  value={value}
                  style={{ width: "100%" }}
                  onChange={(v) => {
                    onChange(v.target.value);
                    setValue("phoneNumber", v.target.value, {
                      shouldValidate: true,
                    });
                  }}
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
                  placeholder="Lavozimi"
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
          <button
            type="submit"
            className="btn btn-success btn-rounded m-1"
            style={{ display: "flex" }}
          >
           O`zgartirish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </DrawerWrapper>
  );
};

export default UpdateUser;
