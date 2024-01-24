import React, { useEffect, useState } from "react";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";
import MinLoader from "../../../../../Common/MinLoader";
import MainResultListWrapper from "../ListResultMain/style";

const ListBreastMilk = ({ patientId, orderId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    BacteriaProvider.getResulBreastMilkByPatientId(patientId, orderId)
      .then((res) => {
        setResults(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [patientId]);

  return (
    <MainResultListWrapper>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "80%" }} className="col">
              Tahlil natijasi
            </th>
            <th style={{ minWidth: "20%" }} className="col">
              Namuna turi
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            results.length ? (
              results.map((obj, index) => (
                <>
                  <tr key={index}>
                    <td style={{ minWidth: "40%", display:'flex', flexDirection:'column' }} className="col">
                      <label>Chap ko`krak</label>
                      {obj.resultLeftBreast}
                    </td>
                    <td style={{ minWidth: "40%", display:'flex', flexDirection:'column' }} className="col">
                    <label>O`ng ko`krak</label>
                      {obj.resultRightBreast}
                    </td>
                    <td style={{ minWidth: "20%", display:'flex', flexDirection:'column' }} className="col">
                      {obj.sampleType}
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <h3 className="noItem">Natijalar mavjud emas</h3>
            )
          ) : (
            <MinLoader />
          )}
        </tbody>
      </table>
    </MainResultListWrapper>
  );
};

export default ListBreastMilk;
