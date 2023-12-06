import { Menu } from '@headlessui/react'
import { DropdownProps } from "@/common/components/molecules/dropdown/types";
import { MenuVerticalIcon } from "@/common/components/icons";
import {
  DropdownList, DropdownTransition,
} from "@/common/components/atoms";

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Dropdown = ({
  options, disabled, listPosition = 'right', icon: Icon, ...rest
}: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className="flex items-center rounded-full text-gray-900 hover:text-brand-500 focus:outline-none focus:ring-2
                     p-1 focus:ring-inset focus:ring-brand-500 disabled:text-gray-400 disabled:cursor-not-allowed"
        disabled={disabled}
        {...rest}
      >
        {!!Icon ? <Icon className="h-8 w-8" /> : <MenuVerticalIcon aria-hidden="true" />}
      </Menu.Button>
      <DropdownTransition>
        <Menu.Items className={classNames(
          listPosition === 'right' ? 'right-0' : 'left-0',
          'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-opacity-5 focus:outline-none divide-y divide-gray-200',
        )}>
          <DropdownList options={options} />
        </Menu.Items>
      </DropdownTransition>
    </Menu>
  );
}
