import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh !important;
  .layout__top {
    flex-shrink: 0;
    border-bottom: 1px solid rgba(31, 60, 136, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 14%) !important;
  }

  .layout_bottom {
    display: flex;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px) !important;
    overflow-y: auto;
    border-top: 1px solid rgba(31, 60, 136, 0.2);

    &::-webkit-scrollbar-track {
      /* -webkit-box-shadow: inset 0 0 6px rgba(187, 187, 187, 0.3); */
      background-color: #c4bebe;
    }
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #838383;
    }
  }

  .layout__sidebar {
    flex-shrink: 0;
    width: 220px;
    border-right: 1px solid rgba(31, 60, 136, 0.2);
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 14%);
    overflow-y: auto;
    transition:width 0.5s ease;
    background: #fff !important;

    &::-webkit-scrollbar-track {
      /* -webkit-box-shadow: inset 0 0 6px rgba(187, 187, 187, 0.3); */
      background-color: #c4bebe;
    }
    &::-webkit-scrollbar {
      width: 4px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #838383;
    }
  }

 
  
  .layout__main {
    height: 100% !important;
    padding: 15px;
    background: #fff;
  }

  .layout__right {
    height: calc(100vh - 90px) !important;
    flex-grow: 1;
    overflow-y: auto;
    &::-webkit-scrollbar-track {
      /* -webkit-box-shadow: inset 0 0 6px rgba(187, 187, 187, 0.3); */
      background-color: #c4bebe;
    }
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #838383;
    }
  }

  /* @media(max-width: 650px){
    .layout__right{
      width: 100vw !important;
    }
  }  */
`;

export { Wrapper };
