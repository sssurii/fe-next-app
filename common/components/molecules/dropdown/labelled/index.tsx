import { Menu } from '@headlessui/react'
import { LabelledDropdownProps } from "../types";
import { ChevronDownIcon } from "@/common/components/icons";
import {
  DropdownList, DropdownTransition,
} from "@/common/components/atoms";


function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export const LabelledDropdown = ({
  label, options, disabled, listPosition = 'right',
}: LabelledDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center items-center gap-x-2.5 rounded-md border-0 px-3 py-2 text-text-primary shadow-sm
          ring-1 ring-inset ring-gray-300 bg-white focus:ring-2 focus:ring-brand-500 hover:bg-gray-50 placeholder:text-gray-400
          sm:text-sm leading-tight disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-text-secondary disabled:ring-gray-200"
          disabled={disabled}
        >
          {label}
          <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
        </Menu.Button>
      </div>
      <DropdownTransition>
        <Menu.Items className={classNames(
          listPosition === 'right' ? 'right-0' : 'left-0',
          'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
        )}>
          <DropdownList options={options} />
        </Menu.Items>
      </DropdownTransition>
    </Menu>
  );
}
