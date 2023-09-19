import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import { AnalizResultAddWrapper } from "./style";
import ParasiteProvider from "../../../../../../Data/ParasiteProvider";
import { useForm } from "react-hook-form";
import ParasitologyResultProvider from "../../../../../../Data/ParasitologyResultProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import MyLink from '../../../../../Common/MyLink'

const AnalizResultAdd = ({id, patientId}) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [parasitology, setParasitology] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ParasiteProvider.getAllParasite()
      .then((res) => {
        setParasitology(res.data.data);
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
    const rowData = parasitology.map((row) => ({
      patientId: patientId,
      parasiteId: row.id,
      orderId:id,
      light: row.light || null,
      medium: row.medium || null,
      heavy: row.heavy || null,
      norm: row.norm || 'bo\'lmaydi',
    }));

    ParasitologyResultProvider.createResultParasite(rowData, id)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        router.push(`/dashboard/operator/result`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowChange = (index, field, value) => {
    const updatedParasitology = [...parasitology];
    updatedParasitology[index][field] = value;
    setParasitology(updatedParasitology);
    console.log(updatedParasitology);
  };

  return (
    <AnalizResultAddWrapper>
      <div className="top">
        <MyLink to="/dashboard/operator/orders">Orqaga</MyLink>
      <h3>Blanka yaratish</h3>
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
                    {index + 1}.{obj.parasite_name}
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj.light || ""}
                      onChange={(e) =>
                        handleRowChange(index, "light", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj.medium || ""}
                      onChange={(e) =>
                        handleRowChange(index, "medium", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj.heavy || ""}
                      onChange={(e) =>
                        handleRowChange(index, "heavy", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj.norm || 'bo\'lmaydi'}
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
        <button type="submit" className="btn btn-success btn-rounded m-1">
          Saqlash
        </button>
      </form>
    </AnalizResultAddWrapper>
  );
};

export default AnalizResultAdd;
