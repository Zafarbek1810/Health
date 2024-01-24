import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import { AnalizResultAddWrapper } from "../AddAnalizResult/style";
import MyLink from "../../../../../Common/MyLink";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";
import { toast } from "react-toastify";

const AddBreastMilk = ({ id, patientId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [leftBreast, setLeftBreast] = useState("");
  const [rightBreast, setRightBreast] = useState("");
  const [loading, setLoading] = useState(false);
  const [sampleTypeText, setSampleTypeText] = useState("");


  const onSubmit = () => {
    const rowData = {
      patientId: +patientId,
      orderDetailId: +id,
      resultLeftBreast: leftBreast || null,
      resultRightBreast: rightBreast || null,
      sampleType: sampleTypeText
    };

    BacteriaProvider.createResultBreastMilk(rowData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        router.push(`/dashboard/laborant/tahlil-result`);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <th style={{ minWidth: "100%" }} className="col">
                Tahlil natijasi
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              <tr>
                <td style={{ minWidth: "20%", display:'flex', flexDirection:'column' }} className="col">
                  <label>Chap ko`krak</label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    // value={obj.result || ""}
                    onChange={(e) => setLeftBreast(e.target.value)}
                  />
                </td>
                <td style={{ minWidth: "20%", display:'flex', flexDirection:'column' }} className="col">
                 <label>O`ng ko`krak</label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    // value={obj.result || ""}
                    onChange={(e) => setRightBreast(e.target.value)}
                  />
                </td>
              </tr>
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

export default AddBreastMilk;
