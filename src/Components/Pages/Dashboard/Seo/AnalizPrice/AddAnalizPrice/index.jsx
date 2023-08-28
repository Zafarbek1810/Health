import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddAnalizPriceWrapper } from "./style";
import { ModalContent, ModalHeader } from "../../Viloyat/AddViloyat/style";
import Select from "react-select";
import CompanyProvider from "../../../../../../Data/CompanyProvider";
import AnalizProvider from "../../../../../../Data/AnalizProvider";
import AnalizPriceProvider from "../../../../../../Data/AnalizPriceProvider";

const AddAnalizPrice = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [analizId, setAnalizId] = useState(null);
  const [company, setCompany] = useState([]);
  const [analiz, setAnaliz] = useState([]);

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
        console.log(res.data.data);
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
    body.companyId = companyId;
    body.analysisId = analizId;
    body.price = values.price;

    setLoading(true);
    AnalizPriceProvider.createAnalysisPrice(body)
      .then((res) => {
        reset();
        console.log(res);
        toast.success(res?.data?.message);
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
    <AddAnalizPriceWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Analiz narxi qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
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
            Qo`shish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddAnalizPriceWrapper>
  );
};

export default AddAnalizPrice;
