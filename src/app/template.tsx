"use client";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import AppContext from "@/providers/context";
import { Navigation } from "@/components";
import { Toaster } from "react-hot-toast";

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
  const { loading } = useContext(AppContext);

  // if (loading) return <Preloader />;

  return (
    <>
      {headerPages.includes(pathname) && <Navigation />}
      <main>{children}</main>
      <Toaster
        containerClassName="toaster-container"
        position="bottom-center"
        toastOptions={{
          className: "toaster-container-info",
          duration: 2000,
          icon: undefined,
          style: {
            minHeight: "86px",
            backgroundColor: "var(--surface-title)",
            color: "#28806B",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 0,
            padding: "8px 15px",
          },
          success: {
            // style: {
            //   backgroundColor: ,
            //   color: ,
            // },
          },
          error: {
            // style: {
            //   backgroundColor: ,
            //   color: ,
            // },
          },
        }}
      />
    </>
  );
}
