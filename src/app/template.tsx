"use client";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import AppContext from "@/providers/context";
import { Navigation, Preloader, MediaPreview } from "@/components";
import { Toaster } from "react-hot-toast";
import { useTelegram } from "@/providers/telegram";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const headerPages = [
  "/",
  "/boost",
  "/friends",
  "/rating",
  "/account",
  "/quest",
  "/spin",
  "/side",
  "/play",
];

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { webApp } = useTelegram();
  const { loading, isRegistered, setLoading } = useContext(AppContext);

  useEffect(() => {
    if (webApp) {
      webApp.ready();
      webApp.expand();
      // @ts-ignore
      webApp.disableVerticalSwipes();
      document.body.classList.add(webApp?.colorScheme);

      webApp.onEvent("themeChanged", () => {
        if (webApp?.colorScheme === "dark") {
          document.body.classList.remove("light");
          document.body.classList.add(webApp.colorScheme);
        }
        if (webApp?.colorScheme === "light") {
          document.body.classList.remove("dark");
          document.body.classList.add(webApp.colorScheme);
        }
      });
    }
  }, [webApp]);

  if (loading)
    return (
      <MediaPreview>
        <ReactPlayer
          url={"/videos/start.mp4"}
          muted
          playsinline
          playing
          width={"100%"}
          height={"100%"}
          onEnded={() => {
            setLoading(false);
          }}
        />
      </MediaPreview>
    );

  return (
    <>
      {isRegistered && !loading && headerPages.includes(pathname) && (
        <Navigation />
      )}
      <main>{children}</main>
      <Toaster
        containerClassName="toaster-container"
        position="top-center"
        toastOptions={{
          className: "toaster-container-info",
          duration: 3000,
          icon: undefined,
          style: {
            minHeight: "86px",
            backgroundColor: "var(--text-caption)",
            color: "var(--text-secondary)",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 0,
            padding: "8px 15px",
          },
          success: {
            style: {
              backgroundColor: "var(--surface-title)",
              color: "#28806B",
            },
          },
          error: {
            style: {
              backgroundColor: "#2b0d08",
              color: "var(--red-5)",
            },
            className: "toaster-container-info toaster-container-info-error",
          },
        }}
      />
    </>
  );
}
