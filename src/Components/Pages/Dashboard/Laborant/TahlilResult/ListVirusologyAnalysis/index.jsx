import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import MainResultListWrapper from "../ListResultMain/style";
import VirusologyProvider from "../../../../../../Data/VirusologyProvider";

const ListVirusologyAnalysis = ({ patientId, orderId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    VirusologyProvider.getResulVirusologyByPatientId(patientId, orderId)
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
            <th style={{ minWidth: "25%" }} className="col">
              Nomi
            </th>
            <th style={{ minWidth: "25%" }} className="col">
              Tahlil natijasi
            </th>
            <th style={{ minWidth: "25%" }} className="col">
              Opkrit
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
                    {results.analysisName}
                  </td>
                  <td style={{ minWidth: "25%" }} className="col">
                    {results.result}
                  </td>
                  <td style={{ minWidth: "25%" }} className="col">
                    {results.opcrete}
                  </td>
                  <td style={{ minWidth: "25%" }} className="col">
                    {results.sampleType}
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

export default ListVirusologyAnalysis;
