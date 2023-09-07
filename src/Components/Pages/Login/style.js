import { styled } from "styled-components";

const LoginWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .main {
    position: relative;
    z-index: 33 !important;
    background-color: #fff;
    width: 80%;
    height: auto;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    display: flex;
    gap: 30px;
    align-items: center;

    .right{
      width: 50%;
      text-align: center;

      h4{
        color: #332e38;
        font-size: 32px;
    }

    form {
      .input {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        label {
          font-style: normal;
          font-family: "Inter";
          font-weight: 300;
          font-size: 20px;
          /* color: #000; */
          color: #70657b;;
          margin-bottom: 10px;
          text-align: start;
          width: 100%;
        }

        input {
          width: 100% !important;
          background: rgba(31, 60, 136, 0.05);
          border: 2px solid #000;
          border: 1px solid rgba(31, 60, 136, 0.2);
          border-radius: 6px;
          margin-bottom: 25px;
          padding: 10px;
          font-size: 1rem;
          font-weight: 600;
          font-family: "Inter";
          color: #000;
        }
      }

      .loginBtn {
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 20px;
        padding: 15px 60px;
        color: #ffffff;
        background: #1f3c88;
        border-radius: 6px;
        border: none;
        height: 50px;
        cursor: pointer;
        margin: auto;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;

        &:disabled {
          cursor: not-allowed !important;
        }
      }
    }
    }

    .left{
      width: 50%;

      img{
        width: 100%;
        height: auto;
      }
    }
    
  }

  

  @media (max-width: 650px) {
    .main{
      width: 80%;
      flex-direction: column;

      .right{
        width: 100%;
      }
    }
  }
`;

export default LoginWrapper;