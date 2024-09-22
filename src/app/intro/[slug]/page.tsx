"use client";
import { useEffect, useState } from "react";
import { TopControlArea, Chapter } from "@/components";

export default function IntroDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <>
      <TopControlArea back />
      <Chapter />
    </>
  );
}
