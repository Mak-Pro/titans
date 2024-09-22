"use client";
import React, { createContext, useState, useEffect } from "react";
import { useTelegram } from "./telegram";
import { checkUser } from "@/api";

const AppContext = createContext({
  loading: true,
  isLogined: false,
  isAdmin: false,
  setLoading: (val: boolean): void => {},
  setIsLogined: (val: boolean): void => {},
  setIsAdmin: (val: boolean): void => {},
  webApp: undefined as WebApp | undefined,
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
  } as WebAppUser | undefined,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { webApp, user } = useTelegram();

  if (webApp) {
    webApp?.ready();
    webApp?.expand();
    // @ts-ignore
    webApp.disableVerticalSwipes();
    document.body.classList.add(webApp?.colorScheme);

    webApp.onEvent("themeChanged", () => {
      if (webApp.colorScheme === "dark") {
        document.body.classList.remove("light");
        document.body.classList.add(webApp.colorScheme);
      }
      if (webApp.colorScheme === "light") {
        document.body.classList.remove("dark");
        document.body.classList.add(webApp.colorScheme);
      }
    });
  }

  useEffect(() => {
    if (user) {
      checkUser(user.id)
        .then((data) => {
          if (typeof data === "object") {
            const {
              data: { token_type, access_token },
            } = data;
            sessionStorage.setItem("token", `${token_type} ${access_token}`);
            setIsLogined(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const [loading, setLoading] = useState(true);
  const [isLogined, setIsLogined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        isLogined,
        setIsLogined,
        isAdmin,
        setIsAdmin,
        webApp,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
