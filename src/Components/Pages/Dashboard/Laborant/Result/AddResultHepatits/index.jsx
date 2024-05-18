import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import { AnalizResultAddWrapper } from "../AddAnalizResult/style";
import MyLink from "../../../../../Common/MyLink";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";
import { toast } from "react-toastify";
import MicroOrganismProvider from "../../../../../../Data/MicroOrganismProvider";
import HepatitProvider from "../../../../../../Data/HepatitProvider";

const AddResultHepatits = ({ id, patientId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [hepatit, setHepatit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sampleTypeText, setSampleTypeText] = useState("");

  useEffect(() => {
    setLoading(true);
    HepatitProvider.getAllHepatits()
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
    const rowData = hepatit.map((row) => {
      return {
        patientId: +patientId,
        hepatitisId: row.id,
        orderDetailId: +id,
        result: row.result || null,
        sampleType: sampleTypeText,
      };
    });

    HepatitProvider.createResultHepatits(rowData)
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
              <th style={{ minWidth: "67%" }} className="col">
                Tekshiruv predmeti
              </th>
              <th style={{ minWidth: "33%" }} className="col">
                Natija
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              hepatit.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "34%", fontSize: 14 }} className="col">
                    {index + 1}.{obj.name}
                  </td>
                  <td style={{ minWidth: "33%", fontSize: 14 }} className="col">
                   {obj.type}
                  </td>
                  <td style={{ minWidth: "33%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
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
        <button type="submit" className="btn btn-success btn-rounded m-1">
          Saqlash
        </button>
      </form>
    </AnalizResultAddWrapper>
  );
};

export default AddResultHepatits;
