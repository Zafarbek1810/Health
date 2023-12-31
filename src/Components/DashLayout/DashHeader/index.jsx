import React, { useEffect, useState } from "react";
import { DashboardHeaderWrapper } from "./DashboardHeader.style";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import { useRouter } from "next/router";
import MyLink from "../../Common/MyLink";
import { useConfirm } from "material-ui-confirm";
import { Popover } from "antd";
import UserSvg from "../../Common/Svgs/UserSvg";
import LogOutSvg from "../../Common/Svgs/LogOutSvg";

const DashboardHeader = ({ RefObj, setIsOpen, setOpen }) => {
  const logoutContext = useContextSelector(
    UserContext,
    (ctx) => ctx.actions.logout
  );

  const router = useRouter();
  const confirm = useConfirm();

  const handleOpen = () => {
    setOpen((p) => !p);
  };

  const handleLogout = () => {
    confirm({
      title: "Haqiqatan ham tizimdan chiqmoqchimisiz?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(() => {
        logoutContext();
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DashboardHeaderWrapper>
      <div className="top">
        <div className="wrap">
          <div className="left">
            <MyLink
              to={
                localStorage.getItem("health-roles") === "ROLE_DIRECTOR"
                  ? "/dashboard/director/statistika"
                  : localStorage.getItem("health-roles") === "ROLE_OPERATOR"
                  ? "/dashboard/operator/statistika"
                  : localStorage.getItem("health-roles") === "ROLE_CASHIER"
                  ? "/dashboard/cashier/statistika"
                  : localStorage.getItem("health-roles") === "ROLE_SEO"
                  ? "/dashboard/ceo/users"
                  : ""
              }
              className="logo"
            >
              <img src="/images/logo.png" alt="" />
            </MyLink>
            <div className="menu-toggle" onClick={handleOpen}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            Sog`liqni saqlash vazirligi
          </div>
          <div className="right">
            <Popover
              className="pop"
              content={
                <button onClick={handleLogout} style={{background:'transparent', color:'#000', display:'flex', border:'none'}}>
                  <span>Chiqish</span> <LogOutSvg/>
                </button>
              }
              trigger="click"
            >
              <h3>
                {localStorage.getItem("health-name")}{" "}
                {localStorage.getItem("health-lastname")} (
                {localStorage.getItem("health-roles") === "ROLE_DIRECTOR"
                  ? "Direktor"
                  : localStorage.getItem("health-roles") === "ROLE_OPERATOR"
                  ? "Operator"
                  : localStorage.getItem("health-roles") === "ROLE_CASHIER"
                  ? "Kassir"
                  : localStorage.getItem("health-roles") === "ROLE_SEO"
                  ? "CEO"
                  : localStorage.getItem("health-roles") === "ROLE_LABORANT"
                  ? "Laborant"
                  : localStorage.getItem("health-roles") === "ROLE_ADMIN"
                  ? "Admin"
                  : ""}
                )
              </h3>
              <UserSvg />
            </Popover>

            {/* <button onClick={handleLogout} title="Chiqish">
              Chiqish <img src="/images/logout.png" alt="" />
            </button> */}
          </div>
        </div>
      </div>
    </DashboardHeaderWrapper>
  );
};

export default DashboardHeader;
