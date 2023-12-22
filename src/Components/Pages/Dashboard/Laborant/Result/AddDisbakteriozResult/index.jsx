import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import { AnalizResultAddWrapper } from "../AddAnalizResult/style";
import MyLink from "../../../../../Common/MyLink";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";
import { toast } from "react-toastify";

const AddDisBakteriozResult = ({ id, patientId }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [disbakterioz, setDisbakterioz] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    BacteriaProvider.getAllBacteria()
      .then((res) => {
        setDisbakterioz(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toHtml = (yozuv) => {
    var indexOfCaret = yozuv?.indexOf("^");
    if (yozuv?.indexOf("^") !== -1) {
      return (
        yozuv?.slice(0, indexOfCaret) +
        "<sup>" +
        yozuv?.slice(indexOfCaret + 1) +
        "</sup>"
      );
    } else {
      return console.log(yozuv);
    }
  };

  const onSubmit = () => {
    const rowData = disbakterioz.map((row) =>
      row.result?.indexOf("^") !== -1
        ? {
            patientId: +patientId,
            bacteriaId: row.id,
            orderDetailId: +id,
            result: (row.result && toHtml(row.result)) || null,
          }
        : {
            patientId: +patientId,
            bacteriaId: row.id,
            orderDetailId: +id,
            result: row.result || null,
          }
    );

    BacteriaProvider.createResultDisbakterioz(rowData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        router.push(`/dashboard/laborant/tahlil-result`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  const handleRowChange = (index, field, value) => {
    const updatedDisbakterioz = [...disbakterioz];
    updatedDisbakterioz[index][field] = value;
    setDisbakterioz(updatedDisbakterioz);
    console.log(updatedDisbakterioz);
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
              <th style={{ minWidth: "20%" }} className="col">
                Tekshirilgan mikroorganizmlar
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Aniqlandi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Me`yor
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              disbakterioz.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "20%", fontSize: 14 }} className="col">
                    {index + 1}.{obj.bacteria_name}
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
                  <td style={{ minWidth: "20%" }} className="col">
                    {/* <input
                      autoComplete="off"
                      className="form-control"
                      value={obj.norm || ""}
                      onChange={(e) =>
                        handleRowChange(index, "norm", e.target.value)
                      }
                    /> */}
                    <div dangerouslySetInnerHTML={createMarkup(obj.norm)} />
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

export default AddDisBakteriozResult;
