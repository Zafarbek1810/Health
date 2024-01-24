import styled from "styled-components";

const SidebarWrapper = styled.div`
  font-family: "Nunito";
 
.ant-badge{
  width: 100%;
}
.ant-badge-count{
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 0 5px;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  right: 40px;
  transform: translate(50%, -50%);
}
  .logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
      width: 100px;
      margin: auto;
    }
  }

  .sidebar-menu {
    background: transparent;
    .links {
      display: flex;
      flex-direction: column;
      padding: 10px;
    }

    .wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between !important;
    }
    .link {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;
      color: #000;
      text-decoration: none;
      transition: all 1s;
      position: relative;
      overflow: hidden;
      z-index: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 20px 10px;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        /* background-color: #fff; */
        z-index: -2;
      }
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: rgba(31, 60, 136, 0.15);
        transition: all 0.3s;
        z-index: -1;
      }
      &:hover {
        color: #1f3c88;
        &:before {
          width: 100%;
        }
      }
      svg {
        fill: none !important;
        stroke: #1f3c88 !important;
        margin-right: 8px;
        width: 25px;
        height: 25px;
      }
    }

    svg {
      fill: none !important;
      stroke: #000 !important;
      margin-right: 8px;
      width: 25px;
      height: 25px;
    }

    img{
      margin-right: 8px;
      width: 25px;
      height: 25px;
      margin-bottom: 7px;
    }
    .activelink {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;
      color: #000;
      text-decoration: none;
      transition: all 1s;
      position: relative;
      overflow: hidden;
      z-index: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 20px 10px;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(31, 60, 136, 0.05);
        /* background-color: #fff; */
        z-index: -2;
      }
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: rgba(31, 60, 136, 0.15);
        transition: all 0.3s;
        z-index: -1;
      }
      &:hover {
        color: #1f3c88;
        &:before {
          width: 100%;
        }
      }
      svg {
        fill: none !important;
        stroke: #1f3c88 !important;
        margin-right: 8px;
        width: 25px;
        height: 25px;
      }
    }
  }

  //make responsive
  @media (max-width: 768px) {
    .sidebar-menu {
      .links {
        display: flex;
        flex-direction: row;
        padding: 10px;
      }
      .link {
        padding: 10px;
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;
        color: #1f3c88;
        transition: all 1s;
        display: flex;
        align-items: center;
        justify-content: start;
        position: relative;
        overflow: hidden;
        z-index: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 20px 0;
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          /* background-color: rgba(31, 60, 136, 0.15); */
          background-color: #f5f5f5;
          z-index: -2;
        }
        &:before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background-color: rgba(31, 60, 136, 0.15);
          transition: all 0.3s;
          z-index: -1;
        }
        &:hover {
          color: #1f3c88;
          &:before {
            width: 100%;
          }
        }
      }
      .activelink {
        padding: 10px;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;
        color: #1f3c88;
        display: flex;
        align-items: center;
        justify-content: start;
        text-decoration: none;
        background: rgba(31, 60, 136, 0.15) !important;
        transition: all 1s;
        position: relative;
        overflow: hidden;
        z-index: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 20px 0;
        &:after {
          content: "";  
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(31, 60, 136, 0.05);
          /* background-color: #fff; */

          z-index: -2;
        }
        &:before {
          content: "";

          position: absolute;
          bottom: 0;
          left: 0;


          width: 0%;

          height: 100%;
          background-color: rgba(31, 60, 136, 0.15);
          transition: all 0.3s;
          z-index: -1;
        }
        &:hover {
          color: #1f3c88;
          &:before {
            width: 100%;
          }
        }
      }
    }
  }

 
`;

export { SidebarWrapper };
