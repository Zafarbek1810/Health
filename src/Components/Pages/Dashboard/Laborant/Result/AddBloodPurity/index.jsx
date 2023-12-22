import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import { AnalizResultAddWrapper } from "../AddAnalizResult/style";
import MyLink from "../../../../../Common/MyLink";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";
import { toast } from "react-toastify";

const AddBloodPurity = ({ id, patientId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [bloodPurity, setBloodPurity] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    const rowData = {
            patientId: +patientId,
            orderDetailId: +id,
            result: bloodPurity || null,
          }

    BacteriaProvider.createResultBloodPurity(rowData)
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
        <h3>Blanka yaratish</h3>
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
                  <td style={{ minWidth: "20%" }} className="col">
                    <input
                      autoComplete="off"
                      className="form-control"
                      // value={obj.result || ""}
                      onChange={(e) =>
                        setBloodPurity(e.target.value)
                        // handleRowChange(index, "result", e.target.value)
                      }
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

export default AddBloodPurity;
