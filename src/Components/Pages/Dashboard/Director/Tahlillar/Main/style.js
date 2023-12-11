import styled from "styled-components";

const TahlillarWrapper = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    .indicators {
      display: flex;
      gap: 50px;
      .item {
        display: flex;
        align-items: center;
        gap: 15px;
        span {
          font-family: "Azo Sans";
        }
      }
    }
  }
  
  .table {
    margin-top: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.03);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* box-shadow: rgb(20 21 33 / 18%) 0px 2px 10px 0px; */

    thead {
      width: 100%;
      tr {
        display: flex;
        /* background: #006786; */
        /* border-radius: 6px 6px 0px 0px; */
        border-bottom: 1px solid rgba(159, 160, 184, 0.3);

        th.col {
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: start;
          text-align: center;
          font-family: "Azo sans";
          padding: 15px 12px 10px 20px;
        }
      }
    }

    tbody {
      background: #fff;
      tr {
        display: flex;
        /* border-bottom: 1px solid rgba(159, 160, 184, 0.3); */
        justify-content: space-between;
        cursor: pointer;

        td.col {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: start;
          color: rgba(0, 0, 0, 0.7);
          font-family: "Azo sans";
          padding: 5px;
        }
        td.col-badge {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: start;
          color: rgba(0, 0, 0, 0.7);
          text-align: center;
          font-family: "Azo sans";
          padding: 5px;
          span {
            display: flex;
            gap: 10px;
            align-items: center;
          }
        }

        img {
          width: 50px;
          height: 50px;
        }

        .btns {
          width: 40%;
          display: flex;
          margin-left: 20px;
          justify-content: start;

          button {
            cursor: pointer;
            transition: 300ms;
            background: transparent;

            svg {
              fill: none;
              width: 20px;
              height: 20px;
              /* fill: rgb(253, 181, 40); */
            }
          }
        }
      }
    }
  }

  .ant-badge {
    .ant-badge-status-dot {
      width: 12px;
      height: 12px;
    }

    &.badge_default {
      .ant-badge-status-processing {
        background: #bbff33;

        &::after {
          border-color: #bbff33;
          background: #bbff33;
        }
      }
    }

    &.badge_danger {
      .ant-badge-status-processing {
        background: #c13c3c;

        &::after {
          border-color: #c13c3c;
          background: #c13c3c;
        }
      }
    }
    &.badge_primary {
      .ant-badge-status-processing {
        background: #474afc;

        &::after {
          border-color: #474afc;
          background: #474afc;
        }
      }
    }
    &.badge_warning {
      .ant-badge-status-processing {
        background: #f1ac03;

        &::after {
          border-color: #f1ac03;
          background: #f1ac03;
        }
      }
    }
    &.badge_success {
      .ant-badge-status-processing {
        background: #3cc18a;

        &::after {
          border-color: #3cc18a;
          background: #3cc18a;
        }
      }
    }
  }
`;

export default TahlillarWrapper;
