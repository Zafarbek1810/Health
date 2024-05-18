import { styled } from "styled-components";

const CreateOrderWrapper = styled.div`
.top{
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: start;
  margin-bottom: 20px;
 

  h3{
    margin-left: 33%;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    color: #000000;
    font-family: "Azo sans";
    margin-bottom: 0;
  }
  }

  .wrapper {
  }
  form {
    display: flex;
    gap: 50px;

    .left, .right{
      width: 50%;
    }

    label {
      width: 100%;
      color: #000;
      .span {
        color: red;
      }
    }

    select {
      width: 100%;
    }

    button{
      margin-top: 25px;
      width: 100%;
    }
  }

  .result {
    width: 100%;
    margin-top: 30px;
    background-color: #e5e5e5;
    padding: 10px;
    border-radius: 5px;

    .result-top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        font-size: 20px;
        font-weight: bold;

      }
    }

    .analiz-result{
      display: flex;
      justify-content: space-between;

      .analizName{
        width: 80%;
      }
      .price{
        width: 20%;
        text-align: end;
      }
    }
  }
`;

export default CreateOrderWrapper;
