import React, { ReactNode } from "react";
import PrivateComponent from "@/common/utils/privateComponent";
import { Header } from "@/common/components/organisms/header";

type LayoutProps = {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: LayoutProps) => {
  return (
    <PrivateComponent>
      <Header />
      {children}
    </PrivateComponent>
  )
}

export default ProtectedLayout;
