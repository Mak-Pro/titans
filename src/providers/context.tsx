"use client";
import React, { createContext, useState, useEffect } from "react";
import { useTelegram } from "./telegram";
import { loginUser, checkUser, referralsUser } from "@/api";
import { RewardsProps } from "@/Types";

const AppContext = createContext({
  loading: true,
  isRegistered: false,
  setLoading: (val: boolean): void => {},
  setIsRegistered: (val: boolean): void => {},
  webApp: undefined as WebApp | undefined,
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
  } as WebAppUser | undefined,
  rewardsData: null as RewardsProps | null,
  setRewardsData: (val: RewardsProps): void => {},
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

  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [rewardsData, setRewardsData] = useState<RewardsProps | null>(null);

  useEffect(() => {
    if (webApp && user) {
      if (sessionStorage.getItem("token") === null) {
        loginUser(webApp.initData).then(() => {
          checkUser(user.id)
            .then((data: any) => {
              if (typeof data === "object" && "userExists" in data.data) {
                const { userExists } = data.data;
                setIsRegistered(userExists as boolean);
              }
            })
            .finally(() => {
              // setLoading(false);
            });

          // set referrals
          if (webApp.initDataUnsafe.start_param) {
            const startParam = webApp.initDataUnsafe.start_param;
            const data = {
              referral: startParam,
              telegramId: user.id,
            };
            referralsUser(data).then((response) => {
              console.log(response);
            });
          }
        });
      } else {
        checkUser(user.id)
          .then((data: any) => {
            if (typeof data === "object" && "userExists" in data.data) {
              const { userExists } = data.data;
              setIsRegistered(userExists as boolean);
            }
          })
          .finally(() => {
            // setLoading(false);
          });
      }
    }
  }, [webApp, user, isRegistered]);

  useEffect(() => {}, [loading, rewardsData]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        isRegistered,
        setIsRegistered,
        webApp,
        user,
        rewardsData,
        setRewardsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
