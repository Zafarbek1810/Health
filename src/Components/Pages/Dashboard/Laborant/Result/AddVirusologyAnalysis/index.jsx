import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import { AnalizResultAddWrapper } from "../AddAnalizResult/style";
import MyLink from "../../../../../Common/MyLink";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import VirusologyProvider from "../../../../../../Data/VirusologyProvider";

const AddVirusologyAnalysis = ({ id, patientId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [virusology, setVirusology] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sampleTypeText, setSampleTypeText] = useState("");

  useEffect(() => {
    setLoading(true);
    VirusologyProvider.getAllVirus()
      .then((res) => {
        setVirusology(res.data.data);
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
    const rowData = virusology.map((row) => {
      return {
        patientId: +patientId,
        virusId: row.id,
        orderDetailId: +id,
        result: row.result || null,
        opcrete: row.opcrete || null,
        sampleType: sampleTypeText,
      };
    });

    VirusologyProvider.createResultVirusologyAnalysis(rowData)
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
    const updatedVirusologys = [...virusology];
    updatedVirusologys[index][field] = value;
    setVirusology(updatedVirusologys);
    console.log(updatedVirusologys);
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
              virusology.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "33%", fontSize: 14 }} className="col">
                    {index + 1}.{obj.virus_name}
                  </td>
                  <td style={{ minWidth: "33%", fontSize: 14 }} className="col">
                  <input
                      autoComplete="off"
                      className="form-control"
                      value={obj.opcrete || ""}
                      onChange={(e) =>
                        handleRowChange(index, "opcrete", e.target.value)
                      }
                    />
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

export default AddVirusologyAnalysis;
