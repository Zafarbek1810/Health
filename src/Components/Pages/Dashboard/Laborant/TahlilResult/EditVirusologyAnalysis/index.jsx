import React, { useEffect, useState } from "react";
import MyLink from "../../../../../Common/MyLink";
import MinLoader from "../../../../../Common/MinLoader";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import EditResultMainWrapper from "./style";
import VirusologyProvider from "../../../../../../Data/VirusologyProvider";
import AnalizProvider from "../../../../../../Data/AnalizProvider";

const EditVirusologyAnalysis = ({ patientId, orderId,templateId, analysisId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [parasitology, setParasitology] = useState([]);
  const [parasitologyResult, setParasitologyResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [resultsData, setResultsData] = useState([]);
  const [sampleTypeText, setSampleTypeText] = useState("");

  function removeDuplicatesById(array1, array2) {
    const normalizedArray1 = Array.isArray(array1) ? array1 : [array1];
    const concatenatedArray = normalizedArray1.concat(array2);
    const uniqueArray = [];

    concatenatedArray.forEach((obj) => {
      const id = obj.uniqueId;
      const isDuplicate = uniqueArray.some((item) => item.uniqueId === id);

      if (!isDuplicate) {
        uniqueArray.push(obj);
      }
    });

    return uniqueArray;
  }

  useEffect(() => {
    setResultsData(removeDuplicatesById(parasitologyResult, parasitology));
  }, [parasitology, parasitologyResult]);

 
  useEffect(() => {
    setLoading(true);
    VirusologyProvider.getResulVirusologyByPatientId(patientId, orderId)
      .then((res) => {
        console.log(res);
        setParasitologyResult({uniqueId: res?.data?.data?.analysisId, ...res.data.data})
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [patientId, orderId]);

  console.log(resultsData, "resultsData");
  //all parasites
  useEffect(() => {
    setLoading(true);
    AnalizProvider.getAllAnalysisTemplateId(templateId)
      .then((res) => {
        const response = res.data.data.map((item) => {
          return {
            uniqueId: item?.id,
            ...item,
          };
        });
        setParasitology(response);
        console.log(response, "res");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRowChange = (index, name, value) => {
    const list = [...resultsData];
    list[index][name] = value;
    setResultsData(list);
  };

  const onSubmit = (data) => {
    const resultat = resultsData?.filter((row=>row.analysisId===+analysisId))[0]
    
    VirusologyProvider.createResultVirusologyAnalysis({
      id: resultat.resultId,
      patientId: +patientId,
      orderDetailId: +orderId,
      result: resultat.result || null,
      opcrete: resultat.opcrete || null,
      sampleType:
        sampleTypeText.length === 0
          ? parasitologyResult[0]?.sampleType
          : sampleTypeText,
    })
      .then((res) => {
        setLoading2(true);
        console.log(res);
        toast.success(res.data.message);
        router.push(`/dashboard/laborant/tahlil-result`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading2(false));
  };



  return (
    <EditResultMainWrapper>
      <div className="top">
        <MyLink to="/dashboard/laborant/tahlil-result">Orqaga</MyLink>
        <h3>Blanka taxrirlash</h3>
        <input
          onChange={(e) => setSampleTypeText(e.target.value)}
          placeholder="Namuna turi"
          defaultValue={parasitologyResult?.sampleType || ""}
          type="text"
          style={{ width: "30%", marginLeft: "auto" }}
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
                Opkrit
              </th>
              <th style={{ minWidth: "33%" }} className="col">
                Natija
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              resultsData.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "33%", fontSize: 14 }} className="col">
                    {index + 1}.{obj.name || obj.analysisName}
                  </td>
                  <td style={{ minWidth: "33%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj.opcrete || ""}
                      disabled={+analysisId !==  +obj.analysisId}
                      onChange={(e) =>
                        handleRowChange(index, "opcrete", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ minWidth: "33%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      disabled={+analysisId !==  +obj.analysisId}
                      value={obj.result || ""}
                      onChange={(e) =>
                        handleRowChange(index, "result", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>
        <button
          type="submit"
          className="btn btn-success btn-rounded m-1"
          style={{ display: "flex" }}
        >
          Saqlash {loading2 && <ButtonLoader />}
        </button>
      </form>
    </EditResultMainWrapper>
  );
};

export default EditVirusologyAnalysis;
