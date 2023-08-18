import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import MyLink from "../../Common/MyLink";
import UserCircle from "../../Common/Svgs/UserCircle";
import { SidebarWrapper } from "./Sidebar.style";

const NavListMenu = [
  //seo role
  {
    title: "Foydalanuvchi yaratish",
    path: "/dashboard/ceo/users",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Company yaratish",
    path: "/dashboard/ceo/company",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Viloyat yaratish",
    path: "/dashboard/ceo/region",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Tuman yaratish",
    path: "/dashboard/ceo/district",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Labaratoriya yaratish",
    path: "/dashboard/ceo/labaratory",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  
  
  //admin role
  //casheir role
  {
    title: "Bemorlarni yaratish",
    path: "/dashboard/cashier/patient",
    src: <UserCircle />,
    role: ["ROLE_CASHIER"],
  },
];

const Sidebar = () => {
  const router = useRouter();

  const userRole = useContextSelector(
    UserContext,
    (ctx) => ctx.state.user.roles
  );
  console.log(userRole);

  const UmumiyListMenu = NavListMenu.filter(({ role }) =>
    role.includes(userRole)
  );

  return (
    <SidebarWrapper>
      <div className="sidebar-menu">
        {UmumiyListMenu.map(({ title, src, path }, idx) => (
          <MyLink
            className={router.pathname === path ? "activelink" : "link"}
            to={path}
            key={idx}
          >
            {src}
            {title}
          </MyLink>
        ))}
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
