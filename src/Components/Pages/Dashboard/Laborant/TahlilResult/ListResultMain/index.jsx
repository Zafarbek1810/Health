import React, { useEffect, useState } from "react";
import MainResultListWrapper from "./style";
import MinLoader from "../../../../../Common/MinLoader";
import ParasitologyResultProvider from "../../../../../../Data/ParasitologyResultProvider";

const ListResultMain = ({ patientId, orderId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ParasitologyResultProvider.getResultParasiteByPatientId(patientId, orderId)
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
            {/* <th style={{ minWidth: "15%" }} className="col">
              Ism familiya
            </th> */}
            <th style={{ minWidth: "15%" }} className="col">
              Parazit nomi
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Yengil
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              O`rta
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Og`ir
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Me`yor
            </th>
            <th style={{ minWidth: "15%" }} className="col">
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
                  {/* <td style={{ minWidth: "15%" }} className="col">
                    {index + 1}. {obj.patient.first_name} {obj.patient.last_name}
                  </td> */}
                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.parasite.parasite_name}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    {obj.light}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    {obj.medium}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    {obj.heavy}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    {obj.norm}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
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

export default ListResultMain;
