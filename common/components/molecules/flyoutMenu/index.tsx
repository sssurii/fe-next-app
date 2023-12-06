import { Fragment } from 'react'
import {
  Popover, Transition,
} from '@headlessui/react'
import { Loader } from "@/common/components/molecules";
import { ChevronDownIcon } from "@/common/components/icons";
import { FlyoutMenuProps } from "@/common/components/molecules/flyoutMenu/types";

export const FlyoutMenu = ({
  icon: Icon, showIndicator = false, isLoading, children, disabled, ...rest
}: FlyoutMenuProps) => {
  return (
    <Popover className="relative" {...rest}>
      <>
        <Popover.Button
          className="flex items-center text-gray-900 hover:text-brand-500 rounded-full focus:outline-none focus:ring-2
          p-1 focus:ring-inset focus:ring-brand-500"
          disabled={disabled}
        >
          <div className="relative inline-block">
            {!!Icon ? <Icon className="h-8 w-8" aria-hidden="true" /> : <ChevronDownIcon aria-hidden="true" />}
            {showIndicator && (
              <span
                className="w-3 h-3 rounded-full bg-brand-500 border-2 border-white absolute top-0 right-0.5"
                data-cy="notifications-indicator"
              >
              </span>
            )}
          </div>
        </Popover.Button>
        <Popover.Overlay className="fixed inset-0 bg-transparent" />
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-[80%]"
          >
            {isLoading && <Loader width="w-full" height="h-full" />}
            {children}
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  )
}
