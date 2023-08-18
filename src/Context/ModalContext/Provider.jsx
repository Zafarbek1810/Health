import React, {useState} from 'react';
import ModalContext from "./Context";

const ModalContextProvider = ({RefObj, modalIsOpen, setIsOpen, children}) => {


  return (
    <ModalContext.Provider value={{
      modalIsOpen,
      setIsOpen,
      RefObj
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
