"use client";
import { usePathname } from "next/navigation";

import { Navigation } from "@/components";
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const headerPages = [
    "/",
    "/boost",
    "/friends",
    "/rating",
    "/account",
    "/quest",
    "/spin",
  ];

  return (
    <>
      {headerPages.includes(pathname) && <Navigation />}
      <main>{children}</main>
    </>
  );
}
