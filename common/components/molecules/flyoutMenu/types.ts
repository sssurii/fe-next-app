import {
  SVGProps, ReactNode, ComponentType,
} from "react";
import { Popover } from '@headlessui/react'

export type HeaderButtonProps = {
  name: string;
  onClick?: () => void;
}

type ExtractProps<T> = T extends ComponentType<infer P> ? P : T;

export type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;
export type FlyoutMenuProps = ExtractProps<typeof Popover> & {
  /** Whether the dropdown is flyout menu */
  disabled?: boolean;
  /** The icon to display next to the flyout menu */
  icon?: IconComponent;
  /** Whether to show the dot indicator */
  showIndicator?: boolean;
  /** The children to display in the flyout menu */
  children: ReactNode;
  /** The loading state of the flyout menu */
  isLoading?: boolean;
}
