'use client';
import React, { ReactNode } from "react";
import { Toaster } from "@/common/components/molecules";

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

export default Layout;
