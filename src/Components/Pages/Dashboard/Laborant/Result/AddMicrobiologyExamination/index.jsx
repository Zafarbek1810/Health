import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import { AnalizResultAddWrapper } from "../AddAnalizResult/style";
import MyLink from "../../../../../Common/MyLink";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";
import { toast } from "react-toastify";
import MicroOrganismProvider from "../../../../../../Data/MicroOrganismProvider";

const AddMicrobiologyExamination = ({ id, patientId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [microorganism, setMicroorganism] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sampleTypeText, setSampleTypeText] = useState("");

  useEffect(() => {
    setLoading(true);
    MicroOrganismProvider.getAllMicroorganism()
      .then((res) => {
        setMicroorganism(res.data.data);
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
    const rowData = microorganism.map((row) => {
      return {
        patientId: +patientId,
        microorganismId: row.id,
        orderDetailId: +id,
        result: row.result || null,
        sampleType: sampleTypeText,
      };
    });

    MicroOrganismProvider.createResultMicroorganism(rowData)
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
    const updatedMicroorganism = [...microorganism];
    updatedMicroorganism[index][field] = value;
    setMicroorganism(updatedMicroorganism);
    console.log(updatedMicroorganism);
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
              microorganism.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "20%", fontSize: 14 }} className="col">
                    {index + 1}.{obj.name}
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
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

export default AddMicrobiologyExamination;
