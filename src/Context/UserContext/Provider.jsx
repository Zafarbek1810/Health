import React, { useLayoutEffect, useState } from "react";
import UserContext from "./Context";
import jwtDecode from "jwt-decode";
import UserProvider from "../../Data/UserProvider";

const Provider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const data = token && (jwtDecode(token) || null);
      return {
        isAuth: !!data,
        user: data,
      };
    } else {
      return {
        isAuth: false,
        user: null,
      };
    }
  });

  const [actions] = useState({ login, logout });
  const [isDoneUserChecking, setIsDoneUserChecking] = useState(false);

  function login(data) {
    const user_data = data?.token && (jwtDecode(data.token) || null);
    console.log(user_data, data.token, data.id, "fsfsdfsdfsd");
    setUserData({ isAuth: true, user: user_data });
  }

  function logout() {
    localStorage.removeItem("token");
    setUserData({ isAuth: false, user: null });
  }

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    UserProvider.getMe().then(
      (res) => {
        console.log(res);
        const data = token && (jwtDecode(token) || null);
        console.log(data);
        if (data) {
          setUserData({ isAuth: true, user: data });
        }
        setIsDoneUserChecking(true);
      },
      () => {
        setIsDoneUserChecking(true);
      }
    );
  }, []);

  return (
    <UserContext.Provider
      value={{
        state: userData,
        actions,
        isDoneUserChecking,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default React.memo(Provider);
