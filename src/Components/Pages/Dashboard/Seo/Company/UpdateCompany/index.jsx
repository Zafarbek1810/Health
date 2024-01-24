import React, { useEffect, useState } from "react";
import AddCompanyWrapper from "../AddCompany/style";
import { ModalContent, ModalHeader } from "../../User/AddUser/style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { useForm, Controller } from "react-hook-form";
import CompanyProvider from "../../../../../../Data/CompanyProvider";
import { toast } from "react-toastify";
import { PatternFormat } from "react-number-format";
import DistrictProvider from "../../../../../../Data/DistrictProvider";
import Select from "react-select";
import RegionProvider from "../../../../../../Data/RegionProvider";

const UpdateCompany = ({ onCloseModal2, editCompany }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState([]);
  const [district, setDistrict] = useState([]);
  const [regionId, setRegionId] = useState({
    value: editCompany.region?.id,
    label: editCompany.region?.name,
  });

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

  console.log(editCompany, regionId);

  useEffect(() => {
    setValue("companyName", editCompany.name);
    setValue("address", editCompany.address);
    setValue("phoneNum", editCompany.phoneNum);
    setValue("telegramCanal", editCompany.telegramCanal);
    setValue("website", editCompany.website);
    setValue("region", {
      value: editCompany?.region?.id,
      label: editCompany?.region?.name,
    });
    setValue("district", {
      value: editCompany?.district?.id,
      label: editCompany?.district?.name,
    });
  }, [editCompany]);

  const onSubmitCompany = async (values) => {
    const body = {};
    body.companyName = values.companyName;
    body.address = values.address;
    body.phoneNum = values.phoneNum;
    body.telegramCanal = values.telegramCanal;
    body.website = values.website;
    body.regionId = editCompany?.region?.id;
    body.districtId = editCompany?.district?.id;

    body.id = editCompany.id;
    setLoading(true);
    CompanyProvider.updateCompany(body)
      .then((res) => {
        reset();
        toast.success("Muvaffaqiyatli o'zgartirildi");
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
        <h2 className="title">Company o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
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
            O`zgartirish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddCompanyWrapper>
  );
};

export default UpdateCompany;
