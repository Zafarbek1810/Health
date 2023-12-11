import React, { useEffect, useState } from "react";
import { AddAntibioticResultWrapper } from './style';
import MinLoader from "../../../../../Common/MinLoader";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import MyLink from "../../../../../Common/MyLink";
import AntibioticProvider from "../../../../../../Data/AntibioticProvider";

const AddAntibioticResult = ({ id, patientId }) => {
    const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [antibiotic, setAntibiotic] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    AntibioticProvider.getAllAntibiotic()
      .then((res) => {
        setAntibiotic(res.data.data);
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
    const rowData = antibiotic.map((row) => ({
      patientId: +patientId,
      antibioticId: row.id,
      orderDetailId: +id,
      result: row.result || null
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

  const handleRowChange = (index, field, value) => {
    const updatedParasitology = [...antibiotic];
    updatedParasitology[index][field] = value;
    setAntibiotic(updatedParasitology);
    console.log(updatedParasitology);
  };
    return (
        <AddAntibioticResultWrapper>
           <div className="top">
        <MyLink to="/dashboard/laborant/tahlillar">Orqaga</MyLink>
        <h3>Blanka yaratish</h3>
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
              antibiotic.slice(0, Math.floor(antibiotic.length / 2)).map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "10%"}} className="col1">
                    {index + 1}
                  </td>
                  <td style={{ minWidth: "65%" }} className="col">
                    {obj.name}
                  </td>
                  <td style={{ minWidth: "25%" }} className="col">
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
              antibiotic.slice( Math.floor(antibiotic.length / 2)).map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "10%" }} className="col1">
                  {index  + 1}
                  </td>
                  <td style={{ minWidth: "65%" }} className="col">
                    {obj.name}
                  </td>
                  <td style={{ minWidth: "25%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      value={obj.result || ""}
                      onChange={(e) =>
                        handleRowChange(index +Math.floor(antibiotic.length / 2), "result", e.target.value)
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

export default AddAntibioticResult;