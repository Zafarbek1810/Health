import React, { useEffect, useState } from "react";
import { DashboardHeaderWrapper } from "./DashboardHeader.style";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import { useRouter } from "next/router";
import MyLink from "../../Common/MyLink";
import AuthProvider from "../../../Data/AuthProvider";


const DashboardHeader = ({ RefObj, setIsOpen, setOpen }) => {
  const logoutContext = useContextSelector(
    UserContext,
    (ctx) => ctx.actions.logout
  );
  const router = useRouter();

  const [name, setName] = useState([]);

  const handleOpen = () => {
    setOpen((p) => !p);
  };

  useEffect(() => {
    AuthProvider.getMe()
      .then((res) => {
        setName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleLogout = () => {
    RefObj.current.textContent = `Haqiqatan ham tizimdan chiqmoqchimisiz?`;
    setIsOpen(true);
    new Promise((res, rej) => {
      RefObj.current.resolve = res;
      RefObj.current.reject = rej;
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
            <MyLink to="/" className="logo"></MyLink>
            <div className="menu-toggle" onClick={handleOpen}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            Sog`liqni saqlash vazirligi
          </div>
          <div className="right">
            <h3>
              {name.firstName} {name.lastName}
            </h3>
            <button onClick={handleLogout} title="Chiqish">
              Chiqish <img src="/images/logout.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </DashboardHeaderWrapper>
  );
};

export default DashboardHeader;
