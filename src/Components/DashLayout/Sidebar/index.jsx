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
    title: "Foydalanuvchilar",
    path: "/dashboard/ceo/users",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Kompaniyalar",
    path: "/dashboard/ceo/company",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Viloyatlar",
    path: "/dashboard/ceo/region",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Tumanlar",
    path: "/dashboard/ceo/district",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Labaratoriyalar",
    path: "/dashboard/ceo/labaratory",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Analiz",
    path: "/dashboard/ceo/analiz",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Analiz narxlari",
    path: "/dashboard/ceo/analiz-price",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Antibiotik",
    path: "/dashboard/ceo/antibiotic",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Bakteriya",
    path: "/dashboard/ceo/bactery",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Parazit",
    path: "/dashboard/ceo/parasit",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Virusologiya",
    path: "/dashboard/ceo/virusology",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  
  
  //admin role
  //casheir role
  
  {
    title: "Statistika",
    path: "/dashboard/cashier/statistika",
    src: <UserCircle />,
    role: ["ROLE_CASHIER"],
  },
  {
    title: "Buyurtmalar",
    path: "/dashboard/cashier/order",
    src: <UserCircle />,
    role: ["ROLE_CASHIER"],
  },
  //director role
  // {
  //   title: "Statistika",
  //   path: "/dashboard/director/statistika",
  //   src: <UserCircle />,
  //   role: ["ROLE_DIRECTOR"],
  // },
  {
    title: "Buyurtmalar",
    path: "/dashboard/director/orders",
    src: <UserCircle />,
    role: ["ROLE_DIRECTOR"],
  },
  
  //operator role
  // {
  //   title: "Analiz yaratish",
  //   path: "/dashboard/operator/analiz-result-add",
  //   src: <UserCircle />,
  //   role: ["ROLE_OPERATOR"],
  // },
  {
    title: "Statistika",
    path: "/dashboard/operator/statistika",
    src: <UserCircle />,
    role: ["ROLE_OPERATOR"],
  },
  {
    title: "Bemorlar",
    path: "/dashboard/operator/patient",
    src: <UserCircle />,
    role: ["ROLE_OPERATOR"],
  },
  {
    title: "Buyurtmalar",
    path: "/dashboard/operator/order",
    src: <UserCircle />,
    role: ["ROLE_OPERATOR"],
  },
  // {
  //   title: "Natijalar",
  //   path: "/dashboard/operator/result",
  //   src: <UserCircle />,
  //   role: ["ROLE_OPERATOR"],
  // },
  
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
