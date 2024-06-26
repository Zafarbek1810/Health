import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import MyLink from "../../Common/MyLink";
import UserCircle from "../../Common/Svgs/UserCircle";
import { SidebarWrapper } from "./Sidebar.style";
import StatisticSvg from "../../Common/Svgs/StatisticSvg";
import AnalysisSvg from "../../Common/Svgs/AnalysisSvg";
import OrderSvg from "../../Common/Svgs/OrderSvg";
import CompanySvg from "../../Common/Svgs/CompanySvg";

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
    src: <CompanySvg />,
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
  {
    title: "Mikroorganizm",
    path: "/dashboard/ceo/microorganism",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  {
    title: "Gepatit",
    path: "/dashboard/ceo/hepatit",
    src: <UserCircle />,
    role: ["ROLE_SEO"],
  },
  
  
  //admin role
  {
    title: "Statistika",
    path: "/dashboard/admin/statistika",
    src: <StatisticSvg />,
    role: ["ROLE_ADMIN"],
  },
  {
    title: "Tahlillar",
    path: "/dashboard/admin/tahlillar",
    src: <AnalysisSvg />,
    role: ["ROLE_ADMIN"],
  },

  //casheir role
  
  {
    title: "Statistika",
    path: "/dashboard/cashier/statistika",
    src: <StatisticSvg />,
    role: ["ROLE_CASHIER"],
  },
  {
    title: "Bemorlar",
    path: "/dashboard/operator/patient",
    src: <UserCircle />,
    role: ["ROLE_CASHIER"],
  },
  {
    title: "Buyurtma yaratish",
    path: "/dashboard/operator/order",
    src: <OrderSvg />,
    role: ["ROLE_CASHIER"],
  },
  {
    title: "Buyurtmalar",
    path: "/dashboard/cashier/order",
    src: <OrderSvg />,
    role: ["ROLE_CASHIER"],
  },
  {
    title: "Tahlillar",
    path: "/dashboard/cashier/tahlillar",
    src: <AnalysisSvg />,
    role: ["ROLE_CASHIER"],
  },
  {
    title: "Shartnomalar",
    path: "/dashboard/cashier/contract",
    src: <AnalysisSvg />,
    role: ["ROLE_CASHIER"],
  },
  {
    title: "San Min",
    path: "/dashboard/cashier/san-min",
    src: <AnalysisSvg />,
    role: ["ROLE_CASHIER"],
  },
  //director role
  {
    title: "Statistika",
    path: "/dashboard/director/statistika",
    src: <StatisticSvg />,
    role: ["ROLE_DIRECTOR"],
  },
  // {
  //   title: "Buyurtmalar",
  //   path: "/dashboard/director/orders",
  //   src: <OrderSvg />,
  //   role: ["ROLE_DIRECTOR"],
  // },
  {
    title: "Tahlillar",
    path: "/dashboard/director/tahlillar",
    src: <AnalysisSvg />,
    role: ["ROLE_DIRECTOR"],
  },
  
  //laborant role
  {
    title: "Statistika",
    path: "/dashboard/laborant/statistika",
    src: <StatisticSvg />,
    role: ["ROLE_LABORANT"],
  },
  {
    title: "Tahlillar",
    path: "/dashboard/laborant/tahlillar",
    src: <AnalysisSvg />,
    role: ["ROLE_LABORANT"],
  },
  {
    title: "Tahlil natijalari",
    path: "/dashboard/laborant/tahlil-result",
    src: <AnalysisSvg />,
    role: ["ROLE_LABORANT"],
  },
  // operator role
  {
    title: "Statistika",
    path: "/dashboard/operator/statistika",
    src: <StatisticSvg />,
    role: ["ROLE_OPERATOR"],
  },
  {
    title: "Buyurtma yaratish",
    path: "/dashboard/operator/order",
    src: <OrderSvg />,
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
