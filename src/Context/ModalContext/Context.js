import {createContext} from "react";

const ModalContext = createContext({
  RefObj: {resolve(){}, reject(){}},
  setIsOpen: () => {},
  modalIsOpen: false
});

export default ModalContext;
