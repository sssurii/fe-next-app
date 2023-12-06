import React from "react";
import {
  Option, Options,
} from "@/common/components/molecules/dropdown/types";
import { Menu } from "@headlessui/react";
import { getClassNames } from "@/common/utils/helpers";

export const DropdownList = ({ options }: Options) => {
  return (
    <>
      {options.map((option: Option) => (
        <div key={option.id}>
          <Menu.Item>
            {({ active }) => (
              <span
                className={getClassNames(
                  active ? 'bg-gray-100 text-text-primary' : 'text-text-secondary',
                  'block px-4 py-2 cursor-pointer text-sm',
                )}
                data-cy={option.id}
                onClick={option.onClick}
              >
                {option.name}
              </span>
            )}
          </Menu.Item>
        </div>
      ))}
    </>
  )
}
