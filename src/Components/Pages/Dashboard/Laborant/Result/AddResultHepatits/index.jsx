import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import { AnalizResultAddWrapper } from "../AddAnalizResult/style";
import MyLink from "../../../../../Common/MyLink";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import HepatitProvider from "../../../../../../Data/HepatitProvider";
import Select from "react-select";
import AnalizProvider from "../../../../../../Data/AnalizProvider";

const AddResultHepatits = ({ id, patientId, templateId, analysisId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [hepatit, setHepatit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sampleTypeText, setSampleTypeText] = useState("");
  const [objType, setObjType] = useState('')

  useEffect(() => {
    setLoading(true);
    AnalizProvider.getAllAnalysisTemplateId(templateId)
      .then((res) => {
        setHepatit(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSubmit = () => {
    const resultat = hepatit?.filter((row=>row.id===+analysisId))[0]
    HepatitProvider.createResultHepatits({
      patientId: +patientId,
      orderDetailId: +id,
      result: resultat.result || null,
      sampleType: sampleTypeText,
    })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        router.push(`/dashboard/laborant/tahlil-result`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowChange = (index, field, value) => {
    const updatedHepatits = [...hepatit];
    updatedHepatits[index][field] = value;
    setHepatit(updatedHepatits);
    console.log(updatedHepatits);
  };

  const optionPayment = [
    {
      value: "QUALITY",
      label: "Сифат",
    },
    {
      value: "AMOUNT",
      label: "Миқдор",
    },
    {
      value: "GENOTYPE",
      label: "Генотиплар",
    },
  ];

  return (
    <AnalizResultAddWrapper>
      <div className="top">
        <MyLink to="/dashboard/laborant/tahlillar">Orqaga</MyLink>
        <h3>Tahlil natija blankasi</h3>
        <input
          onChange={(e) => setSampleTypeText(e.target.value)}
          placeholder="Namuna turi"
          type="text"
          autoComplete="off"
          className="form-control"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "33%" }} className="col">
                Tekshiruv predmeti
              </th>
              <th style={{ minWidth: "33%" }} className="col">
                Natija
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              hepatit.map((obj, index) => {
                return(
                  <tr key={index} >
                  <td style={{ minWidth: "33%", fontSize: 14 }} className="col">
                    {index + 1}.{obj.name}
                  </td>
                  {/* <td style={{ minWidth: "33%", fontSize: 14 }} className="col">
                    <Controller
                      control={control}
                      name="region"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                      }) => (
                        <Select
                          className="select col-3 w-100"
                          value={value}
                          isDisabled={
                            +analysisId !== +obj.id
                          }
                          placeholder="Tanlang"
                          options={optionPayment}
                          onBlur={onBlur}
                          onChange={(v) => {
                            onChange(v);
                            setObjType(v.value);
                          }}
                          ref={ref}
                        />
                      )}
                    />
                  </td> */}
                  <td style={{ minWidth: "33%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      disabled={+analysisId !== +obj.id}
                      value={obj.result || ""}
                      onChange={(e) =>
                        handleRowChange(index, "result", e.target.value)
                      }
                    />
                  </td>
                </tr>
                )
              })
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>
        <button type="submit" className="btn btn-success btn-rounded m-1">
          Saqlash
        </button>
      </form>
    </AnalizResultAddWrapper>
  );
};

export default AddResultHepatits;
