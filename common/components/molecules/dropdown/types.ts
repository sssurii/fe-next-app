import { SVGProps } from "react";

export type Option = {
  id: string;
  name: string;
  onClick?: () => void;
}

export type Options = {
  options: Option[]
};

type position = 'left' | 'right';
export type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;
export type DropdownProps = {
  /** Options for the dropdown */
  options: Option[];
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** The position of the dropdown list */
  listPosition?: position;
  /** The icon to display next to the dropdown */
  icon?: IconComponent;
  /** The data-cy value for the dropdown */
  'data-cy'?: string;
  /** The aria-label value for the dropdown */
  'aria-label'?: string;
}

export type LabelledDropdownProps = DropdownProps & {
  /** Label for the dropdown */
  label: string;
}
