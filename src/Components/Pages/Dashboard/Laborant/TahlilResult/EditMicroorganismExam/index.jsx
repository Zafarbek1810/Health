import React, { useEffect, useState } from "react";
import MyLink from "../../../../../Common/MyLink";
import MinLoader from "../../../../../Common/MinLoader";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ParasitologyResultProvider from "../../../../../../Data/ParasitologyResultProvider";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import EditResultMainWrapper from "./style";
import ParasiteProvider from "../../../../../../Data/ParasiteProvider";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";
import MicroOrganismProvider from "../../../../../../Data/MicroOrganismProvider";

const EditMicroorganismExam = ({ patientId, orderId,  templateId, analysisId, }) => {
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
    MicroOrganismProvider.getResulMicroorganismByPatientId(patientId, orderId)
      .then((res) => {
        console.log(res);
        setParasitologyResult({uniqueId: res?.data?.data?.id, ...res.data.data})
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [patientId, orderId]);


  //3talik
  // useEffect(() => {
  //   setLoading(true);
  //   MicroOrganismProvider.getResulMicroorganismByPatientId(patientId, orderId)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       const response = res.data.data.map((item) => {
  //         return {
  //           uniqueId: item?.id,
  //           ...item,
  //         };
  //       });

  //       setParasitologyResult(response);
  //       console.log(response, "results");
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, [patientId, orderId]);

  console.log(resultsData, "resultsData");
  //all parasites
  useEffect(() => {
    setLoading(true);
    MicroOrganismProvider.getAllMicroorganism()
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
    const resultat = resultsData?.filter((row=>row.id===+analysisId))[0]

    MicroOrganismProvider.createResultMicroorganism({
            id: resultat.resultId,
            patientId: +patientId,
            orderDetailId: +orderId,
            result: resultat.result || null,
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
              <th style={{ minWidth: "20%" }} className="col">
                Nomi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Aniqlandi
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              resultsData.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "20%", fontSize: 14 }} className="col">
                    {index + 1}.{obj.name}
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      disabled={+analysisId !==  +obj.id}
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

export default EditMicroorganismExam;
