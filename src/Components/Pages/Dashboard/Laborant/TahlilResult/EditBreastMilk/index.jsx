import React, { useEffect, useState } from "react";
import MyLink from "../../../../../Common/MyLink";
import MinLoader from "../../../../../Common/MinLoader";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import EditResultMainWrapper from "../EditResultMain/style";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";

const EditBreastMilk = ({ patientId, orderId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [breastMilk, setBreastMilk] = useState([]);
  const [parasitologyResult, setParasitologyResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [results, setResults] = useState('');
  const [leftBreast, setLeftBreast] = useState("");
  const [rightBreast, setRightBreast] = useState("");


  useEffect(() => {
    setLoading(true);
    BacteriaProvider.getResulBreastMilkByPatientId(patientId, orderId)
      .then((res) => {
        setBreastMilk(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [patientId, orderId]);

  const onSubmit = (data) => {
    const rowData = {
      id: breastMilk[0].id,
      patientId: +patientId,
      orderDetailId: +orderId,
      resultLeftBreast: leftBreast || null,
      resultRightBreast: rightBreast || null,
    };

    BacteriaProvider.createResultBreastMilk(rowData)
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
              breastMilk.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "50%", display:'flex', flexDirection:'column' }} className="col">
                    <label>Chap ko`krak</label>
                    <input
                      autoComplete="off"
                      className="form-control"
                      defaultValue={obj.resultLeftBreast || ""}
                      onChange={(e) =>
                        setLeftBreast(e.target.value)
                      }
                    />
                  </td>
                  <td style={{ minWidth: "50%", display:'flex', flexDirection:'column' }} className="col">
                  <label>O`ng ko`krak</label>
                    <input
                      autoComplete="off"
                      className="form-control"
                      defaultValue={obj.resultRightBreast || ""}
                      onChange={(e) =>
                        setRightBreast(e.target.value)
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

export default EditBreastMilk;
