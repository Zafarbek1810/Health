import styled from "styled-components";

const StatistikaWrapper = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  .roww {
    display: flex;
    gap: 16px;
    div {
      width: 100%;
    }
  }
  .bottom {
    p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.5);
    }

    span {
      font-size: 20px;
    }
  }
`;

export default StatistikaWrapper;
