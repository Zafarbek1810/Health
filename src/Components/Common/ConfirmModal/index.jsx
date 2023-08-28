import React, { useContext } from "react";
import Modal from "react-modal";
import ModalContext from "../../../Context/ModalContext";
import { ModalContent, ModalFooter, ModalHeader } from "./style";
import { Button } from "@mui/material";
import CloseIconSvg from "../Svgs/CloseIconSvg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minHeight: 200,
    maxWidth: 600,
    width: "100%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 8,
    color:"#000",
    backgroundColor:"#fff",
  },
};

Modal.setAppElement("#__next");


const ConfirmModal = ({ children }) => {
  const { RefObj, setIsOpen, modalIsOpen } = useContext(ModalContext);

  function ResolveAndClose() {
    RefObj.current.resolve();
    setIsOpen(false);
  }

  function RejectAndClose() {
    RefObj.current.reject();
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={RejectAndClose}
      style={customStyles}
    >
      <ModalHeader>
        <h1 className="modal-title fs-5" id="staticBackdropLabel">
        </h1>
        <Button
          type="button"
          onClick={RejectAndClose}
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <CloseIconSvg/>
        </Button>
      </ModalHeader>
      <ModalContent>
        <p className="text">{children}</p>
      </ModalContent>
      {/* <ModalFooter className="modal-footer">
        <Button type="button" onClick={RejectAndClose} data-bs-dismiss="modal" variant="contained"
        class="btn btn-danger btn-rounded col-6"
        >
          Bekor qilish
        </Button>
        <Button type="button" onClick={ResolveAndClose} data-bs-dismiss="modal" variant="contained"
        class="btn btn-success btn-rounded col-6"
        >
          Tasdiqlash
        </Button>
      </ModalFooter> */}
    </Modal>
  );
};

export default ConfirmModal;
