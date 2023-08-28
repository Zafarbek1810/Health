import React, { useEffect, useState } from "react";
import { PatientMainWrapper } from "./style";
import { useConfirm } from "material-ui-confirm";
import PatientProvider from "../../../../../../Data/PatientProvider";
import { toast } from "react-toastify";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import AddPatient from "../AddPatient";
import UpdatePatient from "../UpdatePatient";

const PatientMain = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState([]);
  const confirm = useConfirm();
  const [editPatient, setEditPatient] = useState({});

  const handleDeletePatient = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await PatientProvider.deletePatient(obj.id);
        setPatient((p) =>
          p.filter((user) => {
            return user.id !== obj.id;
          })
        );
        toast.success("O'chirildi!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditPatient = (obj) => {
    console.log(obj);
    setIsOpenModal2(true);
    setEditPatient(obj);
  };

  useEffect(() => {
    setLoading(true);
    PatientProvider.getAllPatient()
      .then((res) => {
        setPatient(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOpenModal, isOpenModal2]);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  const onCloseModal2 = () => {
    setIsOpenModal2(false);
  };
  return (
    <PatientMainWrapper>
      <div className="top">
        <h3 className="col-2">Bemorlar</h3>

        <Button
          class="col-2 btn btn-primary btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Bemor qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "14%" }} className="col">
            Ismi Familyasi
            </th>
            <th style={{ minWidth: "8%" }} className="col">
              Viloyat
            </th>
            <th style={{ minWidth: "6%" }} className="col">
              Tuman
            </th>
            <th style={{ minWidth: "8%" }} className="col">
              Tug`ilgan sana
            </th>
            <th style={{ minWidth: "8%" }} className="col">
              Telefon
            </th>
            <th style={{ minWidth: "8%" }} className="col">
              Addres
            </th>
            <th style={{ minWidth: "8%" }} className="col">
              officeName
            </th>
            <th style={{ minWidth: "8%" }} className="col">
              contract
            </th>
            <th style={{ minWidth: "5%" }} className="col">
              privilege
            </th>
            <th style={{ minWidth: "8%" }} className="col">
              comment
            </th>
            <th style={{ minWidth: "8%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            patient.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "14%" }} className="col">
                  {index + 1}.{obj.first_name} {obj.last_name}
                </td>
                <td style={{ minWidth: "8%" }} className="col">
                  {obj.region?.name}
                </td>
                <td style={{ minWidth: "6%" }} className="col">
                  {obj.district?.name}
                </td>
                <td style={{ minWidth: "8%" }} className="col">
                  {obj.birth_day}
                </td>
                <td style={{ minWidth: "8%" }} className="col">
                  {obj.phone_number}
                </td>
                <td style={{ minWidth: "8%" }} className="col">
                  {obj.address}
                </td>
                <td style={{ minWidth: "8%" }} className="col">
                  {obj.office_name}
                </td>
                <td style={{ minWidth: "8%" }} className="col">
                  {obj.contract}
                </td>
                <td style={{ minWidth: "5%" }} className="col">
                  {obj.privilege}
                </td>
                <td style={{ minWidth: "8%" }} className="col">
                  {obj.comment}
                </td>

                <td style={{ minWidth: "8%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton onClick={() => handleEditPatient(obj)}>
                      <EditSvg />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePatient(obj)}>
                      <DeleteSvg />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <MinLoader />
          )}
        </tbody>
      </table>
      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <AddPatient onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdatePatient onCloseModal2={onCloseModal2} editPatient={editPatient} />
      </Drawer>
    </PatientMainWrapper>
  );
};

export default PatientMain;
