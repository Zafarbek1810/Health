import { styled } from "styled-components";

const CreateOrderWrapper = styled.div`
.top{

display: flex;
justify-content: center;
margin-bottom: 20px;
font-size: 20px;
}

.wrapper{
    display: flex;
    gap: 50px;
}
  form {
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    select{
        width: 100%;
    }
  }

  .result{
    width: 50%;
  }
`;

export default CreateOrderWrapper;
