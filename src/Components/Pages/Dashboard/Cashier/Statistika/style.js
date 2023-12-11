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

  .topCards {
    .bottom {
      display: flex;
      justify-content: space-between;
    }
  }

  .topCards1 {
    min-height: 120px;
    .ant-card-body {
      display: flex !important;
      justify-content: space-between;
    }

    .svg {
      width: 30%;

      img {
        width: 60px;
        height: 60px;
        object-fit: contain;
      }
    }

    .stat {
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .ant-statistic-title{
        font-size: 12px;
        line-height: 12px;
      }
    }
  }
`;

export default StatistikaWrapper;
