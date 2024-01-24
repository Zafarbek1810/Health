import React, { useEffect, useState } from "react";
import AddCompanyWrapper from "./style";
import { ModalContent, ModalHeader } from "../../User/AddUser/style";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import CompanyProvider from "../../../../../../Data/CompanyProvider";
import { toast } from "react-toastify";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { PatternFormat } from "react-number-format";
import DistrictProvider from "../../../../../../Data/DistrictProvider";
import Select from "react-select";
import RegionProvider from "../../../../../../Data/RegionProvider";

const AddCompany = ({ onCloseModal }) => {
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
    DistrictProvider.getDistrictByRegionId(regionId.value)
      .then((res) => {
        setDistrict(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [regionId]);

  const onSubmitCompany = async (values) => {
    const body = {};
    body.companyName = values.companyName;
    body.address = values.address;
    body.phoneNum = values.phoneNum;
    body.telegramCanal = values.telegramCanal;
    body.website = values.website;
    body.regionId = regionId.value;
    body.districtId = districtId.value;

    setLoading(true);
    CompanyProvider.createCompany(body)
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
    <AddCompanyWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Company qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitCompany)}
        >
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Company nomi"}
              {...register("companyName", { required: true })}
            />
          </div>
          <div className="label">
            <label>Address</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Adress"}
              {...register("address", { required: true })}
            />
          </div>
          <div className="label">
            <label>Telefon raqami</label>
            <Controller
              control={control}
              name="phoneNum"
              render={({ field: { onChange, onBlur, value } }) => (
                <PatternFormat
                  format="+998#########"
                  className="form-control"
                  name="phoneNum"
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
            <label>Telegram kanal</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Telegram kanal"}
              {...register("telegramCanal", { required: true })}
            />
          </div>
          <div className="label">
            <label>Website</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Website"}
              {...register("website", { required: true })}
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
          <button
            type="submit"
            className="btn btn-primary btn-rounded m-1"
            style={{ display: "flex" }}
          >
            Qo`shish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddCompanyWrapper>
  );
};

export default AddCompany;
