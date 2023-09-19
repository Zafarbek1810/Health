import { styled } from "styled-components";

const CreateOrderWrapper = styled.div`
.top{

    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 20px;
}
  form {
    width: 40%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    select{
        width: 100%;
    }
  }
`;

export default CreateOrderWrapper;
