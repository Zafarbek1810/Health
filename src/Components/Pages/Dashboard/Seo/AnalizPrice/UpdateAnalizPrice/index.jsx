import React, { useEffect, useState } from "react";
import { ModalContent, ModalHeader } from "../AddAnalizPrice/style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import AnalizProvider from "../../../../../../Data/AnalizProvider";
import { toast } from "react-toastify";
import CompanyProvider from "../../../../../../Data/CompanyProvider";
import AnalizPriceProvider from "../../../../../../Data/AnalizPriceProvider";

const UpdateAnalizPrice = ({ onCloseModal2, editAnalizPrice }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [analizId, setAnalizId] = useState(null);
  const [company, setCompany] = useState([]);
  const [analiz, setAnaliz] = useState([]);

  console.log(editAnalizPrice);

  useEffect(() => {
    setValue("company", {
      value: +editAnalizPrice?.companyId,
      label: editAnalizPrice?.companyName,
    });
    setValue("analiz", {
      value: +editAnalizPrice?.analysisId, 
      label: editAnalizPrice?.analysisName,
    });
    setValue("price", editAnalizPrice?.price);
  }, [editAnalizPrice]);

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
    AnalizProvider.getAllAnalysis()
      .then((res) => {
        setAnaliz(res.data.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const optionCompany = company?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const optionAnaliz = analiz?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const onSubmitAnalizPrice = async (values) => {
    const body = {};
    body.id = editAnalizPrice.id;
    body.companyId = +editAnalizPrice?.companyId;
    body.analysisId = +editAnalizPrice?.analysisId;
    body.price = values.price;

    setLoading(true);
    AnalizPriceProvider.updateAnalysisPrice(body)
      .then((res) => {
        reset();
        console.log(res);
        toast.success(res?.data?.message);
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
    <div>
      <ModalHeader className="modal-header">
        <h2 className="title">Analiz narxini o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitAnalizPrice)}
        >
          <div className="label">
            <label>Company</label>
            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Companyni tanlang"
                  options={optionCompany}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setCompanyId(v.value);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Analiz</label>
            <Controller
              control={control}
              name="analiz"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Analiz tanlang"
                  options={optionAnaliz}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setAnalizId(v.value);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Narxi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Analiz narxi"}
              {...register("price", { required: true })}
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
    </div>
  );
};

export default UpdateAnalizPrice;
