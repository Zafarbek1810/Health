import { styled } from "styled-components";

const AddPatientWrapper = styled.div`


`
const ModalHeader = styled.header`
  background: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f6f8;
  padding: 20px 20px 5px 20px;

  h2.title {
    margin-bottom: 0;
    font-size: 25px !important;
  }

  svg {
    height: 20px;
    width: 20px;
    color: #000;
  }

  button.closeSvg {
    background: transparent;
    border: none;
  }
`


const ModalContent = styled.div`
  border-bottom: 1px solid #f5f6f8;
  background: #fff;
  .ant-picker-dropdown{
    z-index: 99999 !important;
  }

  form {
    background: #fff;
    font-family: "Inter";
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .label {
      width: 48%;
      display: block;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      margin-bottom: 20px;
      font-family: Azo sans;

      span.label-text {
        font-style: normal;
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 18px;
        color: #000000;
        margin-bottom: 8px;
      }

      input {
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 16px;
        color: #000000;
        border-radius: 6px;
        padding: 10px 10px;

        /* &:focus{
          border: red;
          box-shadow: 0 0 0 0.1rem rgba(255,99,71);
        } */
      }

      span.err-text {
        color: red !important;
        position: absolute;
        left: 0;
        top: 70px;
      }

      .select {
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 20px;
        color: #000000;
        font-family: Azo sans;

      }
    }

      button {
        width: 100%;
        text-align: center;
        font-style: normal;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 18px;
        border-radius: 4px;
        padding: 12px 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Azo sans;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
      }
  }

`

export { AddPatientWrapper, ModalHeader, ModalContent}