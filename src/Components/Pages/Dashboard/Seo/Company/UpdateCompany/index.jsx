import React, { useEffect, useState } from "react";
import AddCompanyWrapper from "../AddCompany/style";
import { ModalContent, ModalHeader } from "../../User/AddUser/style";
import CloseIconSvg from "../../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";
import CompanyProvider from "../../../../../../Data/CompanyProvider";
import { toast } from "react-toastify";

const UpdateCompany = ({onCloseModal2, editCompany}) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue("companyName", editCompany.name);
    }, [editCompany]);

  const onSubmitCompany = async (values) => {
    const body = {};
    body.companyName = values.companyName;

    body.id = editCompany.id;
    setLoading(true);
    CompanyProvider.updateCompany(body)
      .then((res) => {
        reset();
        toast.success("Muvaffaqiyatli o'zgartirildi");
        onCloseModal2();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AddCompanyWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Company o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitCompany)}
        >
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Company nomi"}
              {...register("companyName", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success btn-rounded m-1"
            style={{ display: "flex" }}
          >
            O`zgartirish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddCompanyWrapper>
  );
};

export default UpdateCompany;
