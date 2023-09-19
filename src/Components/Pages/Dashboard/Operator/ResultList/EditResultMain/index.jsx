import React, { useEffect, useState } from "react";
import MyLink from "../../../../../Common/MyLink";
import MinLoader from "../../../../../Common/MinLoader";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ParasitologyResultProvider from "../../../../../../Data/ParasitologyResultProvider";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import EditResultMainWrapper from "./style";

const EditResultMain = ({ patientId, orderId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [parasitology, setParasitology] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    setLoading(true);
    ParasitologyResultProvider.getResultParasiteByPatientId(patientId, orderId)
      .then((res) => {
        setParasitology(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [patientId, orderId]);

  const handleRowChange = (index, name, value) => {
    const list = [...parasitology];
    list[index][name] = value;
    setParasitology(list);
  };

  const onSubmit = (data) => {
    setLoading2(true);
    const rowData = parasitology.map((row) => ({
      id: row.id,
      patientId: patientId,
      parasiteId: row.parasite?.id,
      orderId: orderId,
      light: row.light || null,
      medium: row.medium || null,
      heavy: row.heavy || null,
      norm: row.norm || "bo'lmaydi",
    }));

    ParasitologyResultProvider.updateResultParasite(rowData, orderId)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        router.push(`/dashboard/operator/result`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading2(false));
  };

  console.log(parasitology);

  return (
    <EditResultMainWrapper>
      <div className="top">
        <MyLink to="/dashboard/operator/result">Orqaga</MyLink>
        <h3>Blanka taxrirlash</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "20%" }} className="col">
                Tekshirilgan parazit turi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Yengil
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                O`rta
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Og`ir
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Me`yor
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              parasitology.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "20%" }} className="col">
                    {index + 1}.
                    {obj.parasite?.parasite_name || obj.parasite_name}
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj?.light || ""}
                      onChange={(e) =>
                        handleRowChange(index, "light", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj?.medium || ""}
                      onChange={(e) =>
                        handleRowChange(index, "medium", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj?.heavy || ""}
                      onChange={(e) =>
                        handleRowChange(index, "heavy", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj?.norm || "bo'lmaydi"}
                      onChange={(e) =>
                        handleRowChange(index, "norm", e.target.value)
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
        <button type="submit" className="btn btn-success btn-rounded m-1" style={{display:"flex"}}>
          Saqlash {loading2 && <ButtonLoader />}
        </button>
      </form>
    </EditResultMainWrapper>
  );
};

export default EditResultMain;
