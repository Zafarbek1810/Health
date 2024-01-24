import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import MyLink from "../../../../../Common/MyLink";
import { AddAntibioticResultWrapper } from "../../Result/AddAntibiotikResult/style";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AntibioticProvider from "../../../../../../Data/AntibioticProvider";
import { toast } from "react-toastify";

const EditAntibioticResult = ({ patientId, orderId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [antibiotic, setAntibiotic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [antibioticResult, setAntibioticResult] = useState([]);
  const [resultsData, setResultsData] = useState([]);
  const [sampleTypeText, setSampleTypeText] = useState('');

  function removeDuplicatesById(array1, array2) {
    const concatenatedArray = array1.concat(array2);
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
    setResultsData(removeDuplicatesById(antibioticResult, antibiotic));
  }, [antibioticResult, antibiotic]);

  useEffect(() => {
    setLoading(true);
    AntibioticProvider.getAllAntibiotic()
      .then((res) => {
        const response = res.data.data.map((item) => {
          return {
            uniqueId: item.id,
            ...item,
          };
        });
        setAntibiotic(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AntibioticProvider.getAntibioticByPatientId(patientId, orderId)
      .then((res) => {
        console.log(res.data.data);
        const response = res.data.data.map((item) => {
          return {
            uniqueId: item.id,
            ...item,
          };
        });
        setAntibioticResult(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientId, orderId]);

  const onSubmit = () => {
    const rowData = antibiotic.map((row) => ({
      id: row.resultId,
      patientId: +patientId,
      antibioticId: row.id,
      orderDetailId: +orderId,
      result: row.result || null,
      sampleType: sampleTypeText,
    }));

    AntibioticProvider.addAntibioticResult(rowData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        router.push(`/dashboard/laborant/tahlil-result`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleRowChange = (index, field, value) => {
  //   console.log(index, field, value)
  //   const updatedParasitology = removeDuplicatesById(
  //     antibioticResult,
  //     antibiotic
  //   );
  //   updatedParasitology[index][field] = value;
  //   setAntibiotic(updatedParasitology);
  //   console.log(updatedParasitology, "updatedParasitology");
  // };

  const handleRowChange = (index, field, value) => {
    setAntibiotic((prevAntibiotic) => {
      const updatedAntibiotic = [...prevAntibiotic];
      updatedAntibiotic[index][field] = value;
      return updatedAntibiotic;
    });
  };

  function sort_by_id() {
    return function (elem1, elem2) {
      if (elem1.uniqueId < elem2.uniqueId) {
        return -1;
      } else if (elem1.id > elem2.id) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  return (
    <AddAntibioticResultWrapper>
      <div className="top">
        <MyLink to="/dashboard/laborant/tahlil-result/">Orqaga</MyLink>
        <h3>Blanka taxrirlash</h3>
          <input
            onChange={(e) => setSampleTypeText(e.target.value)}
            placeholder="Namuna turi"
            defaultValue={antibioticResult[0]?.sampleType || ""}
            type="text"
            style={{ width: "30%", marginLeft: "auto" }}
            autoComplete="off"
            className="form-control"
          />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tables">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th style={{ minWidth: "10%" }} className="col">
                   №
                </th>
                <th style={{ minWidth: "65%" }} className="col">
                  Antibiotiklar nomi
                </th>
                <th style={{ minWidth: "25%" }} className="col">
                  Sezuvchanligi
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                resultsData
                  .sort(sort_by_id())
                  .slice(0, Math.floor(resultsData.length / 2))
                  .map((obj, index) => (
                    <tr key={index}>
                      <td style={{ minWidth: "10%" }} className="col1">
                        {index + 1}
                      </td>
                      <td
                        style={{ minWidth: "65%", fontSize: 18 }}
                        className="col"
                      >
                        {obj.name}
                      </td>
                      <td style={{ minWidth: "25%" }} className="col">
                        <input
                          autoComplete="off"
                          className="form-control"
                          // value={obj?.result || ""}
                          defaultValue={obj?.result || ""}
                          onChange={(e) =>
                            handleRowChange(index , "result", e.target.value)
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
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th style={{ minWidth: "10%" }} className="col">
                   №
                </th>
                <th style={{ minWidth: "65%" }} className="col">
                  Antibiotiklar nomi
                </th>
                <th style={{ minWidth: "25%" }} className="col">
                  Sezuvchanligi
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                resultsData
                  .slice(Math.floor(resultsData.length / 2))
                  .map((obj, index) => (
                    <tr key={index}>
                      <td style={{ minWidth: "10%" }} className="col1">
                        {index + Math.floor(resultsData.length / 2) + 1}
                      </td>
                      <td
                        style={{ minWidth: "65%", fontSize: 18 }}
                        className="col"
                      >
                        {obj.name}
                      </td>
                      <td style={{ minWidth: "25%" }} className="col">
                        <input
                          autoComplete="off"
                          className="form-control"
                          value={obj.result || ""}
                          onChange={(e) =>
                            handleRowChange(
                              index + Math.floor(resultsData.length / 2) ,
                              "result",
                              e.target.value
                            )
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
        </div>
        <button type="submit" className="btn btn-success btn-rounded m-1">
          Saqlash
        </button>
      </form>
    </AddAntibioticResultWrapper>
  );
};

export default EditAntibioticResult;
