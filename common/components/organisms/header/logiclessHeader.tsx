'use client';
import lang from "@/common/lang";
import Link from "next/link";
import {
  BellIcon, Logo,
} from "@/common/components/icons";
import { HeaderProps } from "@/common/components/organisms/header/types";
import React, { useState } from "react";
import Image from "next/image";
import UserAvatarPlaceholder from "@/assets/images/UserAvatarPlaceholder.png";
import { routes } from "@/common/routes";
import { Navigation } from "@/common/components/organisms/header/navigation";
import {
  FlyoutMenu, Loader,
} from "@/common/components/molecules";
import { NotificationList } from "@/common/components/organisms/flyoutMenu";
import { MobileMenu } from "@/common/components/organisms/header/mobileMenu";
import { Menu } from "@/common/components/organisms/header/menu";
import { Dialog } from "@headlessui/react";

const { header } = lang;
const { ariaLabels } = header;

const Bell = () => (
  <BellIcon className="w-6 h-6 hover:stroke-brand-500" />
)

export const LogicLessHeader = ({
  showNotificationsFeature, notificationsList, onUpdateNotificationsStatus, notificationsLoader, mutateNotificationsInfiniteList, isUpdatingNotificationStatus, router, handleLogout, options, userImage,
  actionButtonCallbacks, actionButtonTexts,
} : HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openMobileMenu = () => setMobileMenuOpen(true);

  const UserAvatar = () => (
    <Image
      src={userImage || UserAvatarPlaceholder}
      width={32}
      height={32}
      alt={ariaLabels.avatar}
      className="cursor-pointer rounded-full"
    />
  )

  return (
    <header className="bg-white border-b border-gray-300">
      <nav className="h-16 mx-auto flex max-w-7xl items-center justify-between px-8" aria-label="Global">
        <div className="flex">
          <Link href={routes.homePath} className="-m-1.5 p-1.5" aria-label={ariaLabels.company}>
            <Logo width={80} height={40} />
          </Link>
        </div>
        <div className="hidden md:flex md:gap-x-4">
          <Navigation />
        </div>
        <div className="flex justify-end items-center">
          {showNotificationsFeature && (
            <div className="flex mr-4">
              <FlyoutMenu
                icon={Bell}
                data-cy="notifications-dropdown"
                showIndicator={notificationsList.length > 0}
                aria-label={header.ariaLabels.openNotifications}
                isLoading={notificationsLoader}
              >
                {isUpdatingNotificationStatus && <Loader width="w-full" height="h-full" />}
                <NotificationList
                  title={header.notifications}
                  options={notificationsList}
                  onUpdateNotificationsStatus={(id) => onUpdateNotificationsStatus(id, mutateNotificationsInfiniteList)}
                  headerButtonProps={{
                    name: header.viewAll,
                    onClick: () => router.push(routes.notificationsSettingsPath),
                    disabled: notificationsList.length === 0,
                  }}
                  actionButtonCallbacks={actionButtonCallbacks}
                  actionButtonTexts={actionButtonTexts}
                />
              </FlyoutMenu>
            </div>
          )}
          <MobileMenu openMobileMenu={openMobileMenu} userAvatarImage={UserAvatar} />
          <Menu userAvatarImage={UserAvatar} options={options} />
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href={routes.homePath} className="-m-1.5 p-1.5" aria-label={ariaLabels.company}>
              <Logo width={80} height={40} />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {header.close}
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                <span
                  onClick={() => router.push(routes.generalSettingsPath)}
                  className="-mx-5 block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  {header.settings}
                </span>
              </div>
              <div className="py-6">
                <span
                  onClick={handleLogout}
                  className="-mx-5 block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  {header.logout}
                </span>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
