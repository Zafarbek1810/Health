import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddParasiteWrapper } from "./style";
import { ModalContent, ModalHeader } from "../AddParasite/style";
import Select from "react-select";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";
import ParasiteProvider from "../../../../../../Data/ParasiteProvider";
import AnalizProvider from "../../../../../../Data/AnalizProvider";

const AddParasite = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [labaratoryId, setLabaratoryId] = useState(null);
  const [analizId, setAnalizId] = useState(null);
  const [labaratory, setLabaratory] = useState([]);
  const [analiz, setAnaliz] = useState([]);

  useEffect(() => {
    LabaratoryProvider.getAllLaboratory()
      .then((res) => {
        setLabaratory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (labaratoryId) {
      AnalizProvider.getAllAnalysisByLab(labaratoryId)
        .then((res) => {
          setAnaliz(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [labaratoryId]);

  const optionLabaratory = labaratory?.map((item) => {
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

  const onSubmitParasite = async (values) => {
    const body = {};
    body.parasiteName = values.parasiteName;
    body.analysisId = analizId;

    setLoading(true);
    ParasiteProvider.createParasite(body)
      .then((res) => {
        reset();
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
    <AddParasiteWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Parazit qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitParasite)}
        >
          <div className="label">
            <label>Laboratory</label>
            <Controller
              control={control}
              name="labaratory"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Laboratoryni tanlang"
                  options={optionLabaratory}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setLabaratoryId(v.value);
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
              name="analysis"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Analizni tanlang"
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
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Parazit nomi"}
              {...register("parasiteName", { required: true })}
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
    </AddParasiteWrapper>
  );
};

export default AddParasite;
