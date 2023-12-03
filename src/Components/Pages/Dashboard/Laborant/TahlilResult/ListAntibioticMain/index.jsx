import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import MainResultListWrapper from "../ListResultMain/style";
import AntibioticProvider from "../../../../../../Data/AntibioticProvider";

const ListAntibioticMain = ({ patientId, orderId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    AntibioticProvider.getAntibioticByPatientId(patientId, orderId)
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
            <th style={{ minWidth: "15%" }} className="col">
              Antibiotik nomi
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            results.length ? (
              results.map((obj, index) => (
                <>
                  <tr key={index}>
                    {/* <td style={{ minWidth: "15%" }} className="col">
                    {index + 1}. {obj.patient.first_name} {obj.patient.last_name}
                  </td> */}
                    <td style={{ minWidth: "15%" }} className="col">
                      {obj.name}
                    </td>
                    <td style={{ minWidth: "10%" }} className="col">
                      {obj.result}
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

export default ListAntibioticMain;
