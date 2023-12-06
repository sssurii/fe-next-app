import { SVGProps } from 'react';

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;
export type NavigationElement = {
  id: string;
  name: string;
  href: string;
  icon: IconComponent;
  'data-cy': string;
}

export type NavigationProps = {
  navigationElements: NavigationElement[];
}
