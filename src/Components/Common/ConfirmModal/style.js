import styled from "styled-components";

const ModalContent = styled.div`
  margin-bottom: 30px;
    color: #000;

  .text {
    white-space: pre-wrap;
    font-size: 1rem;
    font-family: "Azo sans" !important;

    strong {
      font-weight: 700;
    }
  }
`

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  button{
    background: transparent;
    border: none;
   cursor: pointer;

   &:focus{
      outline: none !important;
      background-color: transparent !important;
   }

   &:active{
      outline: none !important;
      background-color: transparent !important;
   }

   svg{
    width : 30px;
    height: 30px;
   }
  }
  
`

const ModalFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    padding: 10px;
    width: 45%;
    font-weight: 600;
  }

  /* button {
    font-size: 0.875rem;
    line-height: 18px;
    font-weight: 600;
    padding: 12px 30px;
    background-color: #1F3C88;
    font-family: "Montserrat" !important;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid transparent;
  }
  button:last-child {
    background-color: #fff;
    color: #1f3c88;
    border: 1px solid #1f3c88;
  } */
`

const ModalWrapper = styled.div`
  .modal-wrapper {
    .modal-body {
      .input {
        margin-bottom: 30px;

        label {
          font-size: 16px;

          span {
            color: red;
          }
        }
      }
    }

    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;

      .btn {
        width: 50%;
        font-weight: 600;
      }
    }
  }
`

export {
  ModalContent,
  ModalHeader,
  ModalWrapper,
  ModalFooter
}
