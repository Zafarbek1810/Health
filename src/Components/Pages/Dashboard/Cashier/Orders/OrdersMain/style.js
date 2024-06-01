import { styled } from "styled-components";

const OrderMainWrapper = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .left {
      width: 30%;
      position: relative;

      .select {
      }
    }
  }

  .errorText {
    position: absolute;
    bottom: -35px;
    left: 0;
    color: red;
    font-size: 12px;
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
          display: flex;
          align-items: center;
          justify-content: space-between;

          button {
            background: transparent;
            border: none;
          }
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
          text-align: left;
          font-family: "Azo sans";
          padding: 5px;
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
            &:disabled{
              opacity: 0.6;
            }
          }
        }
      }
    }
  }

  hr {
    margin: 5px;
  }

  .ant-badge {
    .ant-badge-status-dot {
      width: 8px !important;
      height: 8px !important;
    }

    &.badge_default {
      .ant-badge-status-processing {
        background: #8d96a8;

        &::after {
          border-color: #8d96a8;
          background: #8d96a8;
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

export default OrderMainWrapper;
