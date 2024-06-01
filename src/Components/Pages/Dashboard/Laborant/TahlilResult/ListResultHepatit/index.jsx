import React, { useEffect, useState } from "react";
import BacteriaProvider from "../../../../../../Data/BacteriaProvider";
import MinLoader from "../../../../../Common/MinLoader";
import MainResultListWrapper from "../ListResultMain/style";
import HepatitProvider from "../../../../../../Data/HepatitProvider";
import MyLink from "../../../../../Common/MyLink";

const ListResultHepatit = ({ patientId, orderId }) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    HepatitProvider.getResulHepatitsByPatientId(patientId, orderId)
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
       <MyLink to="/dashboard/laborant/tahlil-result">Orqaga</MyLink>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "25%" }} className="col">
              Nomi
            </th>
            <th style={{ minWidth: "25%" }} className="col">
              Tahlil natijasi
            </th>
            <th style={{ minWidth: "25%" }} className="col">
              Namuna turi
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            <tr>
              <td style={{ minWidth: "25%" }} className="col">
                {results?.name}
              </td>
              <td style={{ minWidth: "25%" }} className="col">
                {results?.result}
              </td>
              <td style={{ minWidth: "25%" }} className="col">
                {results?.sampleType}
              </td>
            </tr>
          ) : (
            <MinLoader />
          )}
        </tbody>
      </table>
    </MainResultListWrapper>
  );
};

export default ListResultHepatit;
