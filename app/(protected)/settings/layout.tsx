'use client';
import { SettingsNavigation } from "@/common/components/organisms/settingsNavigation";
import { Toaster } from "@/common/components/molecules";
import { navigationElements } from "@/app/(protected)/settings/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}
const SettingsLayout = ({ children }: Props) => {
  return (
    <>
      <div className="mx-auto max-w-7xl py-8 sm:py-16 lg:flex lg:gap-x-16 lg:px-8">
        <SettingsNavigation navigationElements={navigationElements} />
        <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
          <div className="mt-8 mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:mt-0 sm:pr-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </>
  )
}
export default SettingsLayout;
