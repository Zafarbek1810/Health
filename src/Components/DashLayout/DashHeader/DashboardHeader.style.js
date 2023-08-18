import styled from "styled-components";

const DashboardHeaderWrapper = styled.div`
  background: #fff;

  
  .top {
    padding: 10px 30px;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    font-family: Azo sans;

    .left {
      width: 40%;
      display: flex;
      align-items: center;
      .menu-toggle {
        width: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        margin-right: 12px;

        & > div {
          width: 24px;
          height: 1px;
          background: #000;
          margin: 3px 0;
        }
      }
      img {
        width: 100px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      h3 {
        font-size: 20px;
        margin-right: 20px;
        margin-bottom: 0;
      }

      @keyframes bell {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(10deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }

      button {
        background: transparent;
        border: none;
        color: #000;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        
        img{
          width: 20px;
        }
      }

      svg {
        width: 20px;
      }
    }
  }
  .content {
    padding: 0px 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* position: relative; */

    img {
      width: 230px;
    }

    .links_cont {
      display: flex;
      justify-content: center;
      margin: 0;

      li {
        list-style: none;
      }

      .navs {
        flex-shrink: 0;
        position: relative;
        padding: 30px 20px;
        display: flex;

        .arrow-svg {
          font-size: 13px;
          position: absolute;
          left: -15px;
          top: 50%;
          transform: translateY(-55%);
          color: transparent;
          transition: 0.3s;
          line-height: 1.2;
        }

        .angle-svg {
          font-size: 13px;
          margin-left: 5px;
          color: #fff;
          transition: color 0.1s ease;
        }

        &:hover {
          .arrow-svg {
            left: 0;
            color: white;
          }
        }

        p {
          font-size: 13px;
          line-height: 1.2;
        }
      }

      a {
        text-transform: uppercase;
        text-decoration: none;
      }

      p {
        margin: 0;
        padding: 0;
      }
    }
  }

  // --------------------------- DROPDOWN MENU ----------------------------------
  .content {
    .links_cont {
      & > li {
        position: relative;
      }

      & > li:hover {
        & > .dropdown {
          top: 100%;
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }

  .dropdown {
    position: absolute;
    background-color: #fff;
    color: #222;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    left: 0;
    top: 140%;
    opacity: 0;
    visibility: hidden;
    padding: 0;

    transition: opacity 0.3s ease, visibility 0.3s ease, top 0.3s ease;

    &__list {
      padding: 0;
    }

    &__item {
    }

    &__link {
      padding: 15px 40px;
      display: block;
      white-space: nowrap;
      position: relative;
      font-size: 13px;

      svg {
        position: absolute;
        top: 50%;
        left: -10px;
        transform: translateY(-50%);
        opacity: 0;
        color: #222;
        transition: opacity 0.3s ease, left 0.3s ease;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);

        svg {
          left: 15px;
          opacity: 1;
        }
      }
    }
  }

  @media (max-width: 650px) {
    .top {
      width: 100vw;
      background-color: #f5f5f5;
    }
    .left {
      display: none;
    }

    .right {
      button {
        display: flex;
        align-items: center;
        svg {
          margin-left: 10px;
        }
      }

      h3{
        display: none;
      }
    }
  }
`;

export { DashboardHeaderWrapper };
