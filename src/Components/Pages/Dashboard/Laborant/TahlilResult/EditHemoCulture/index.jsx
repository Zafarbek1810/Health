import React, { useEffect, useState } from "react";
import MyLink from "../../../../../Common/MyLink";
import MinLoader from "../../../../../Common/MinLoader";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import EditResultMainWrapper from "../EditResultMain/style";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";

const EditHemoCulture = ({ patientId, orderId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [bloodPurity, setBloodPurity] = useState([]);
  const [parasitologyResult, setParasitologyResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [results, setResults] = useState("");
  const [sampleTypeText, setSampleTypeText] = useState("");

  //3talik
  useEffect(() => {
    setLoading(true);
    BacteriaProvider.getResulHemoCultureByPatientId(patientId, orderId)
      .then((res) => {
        setBloodPurity(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [patientId, orderId]);

  const onSubmit = (data) => {
    const rowData = {
      id: bloodPurity[0]?.id,
      patientId: +patientId,
      orderDetailId: +orderId,
      result: results.length===0 ? bloodPurity[0]?.result : results,
      sampleType: sampleTypeText.length === 0 ? bloodPurity[0]?.sampleType : sampleTypeText,
    };

    BacteriaProvider.createResultHemoCulture(rowData)
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
        {bloodPurity.map((obj, index) => (
          <input
            key={index}
            onChange={(e) => setSampleTypeText(e.target.value)}
            placeholder="Namuna turi"
            defaultValue={obj.sampleType || ""}
            type="text"
            style={{ width: "30%", marginLeft: "auto" }}
            autoComplete="off"
            className="form-control"
          />
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "20%" }} className="col">
                Tahlil natijasi
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              bloodPurity.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      defaultValue={obj.result || ""}
                      onChange={(e) => setResults(e.target.value)}
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

export default EditHemoCulture;
