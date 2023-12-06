import {
  ReactNode, LinkHTMLAttributes,
} from "react";
import { LinkProps as NextLinkProps } from "next/link";

export type Variants = 'outlined';
export const TVariants = {
  outlined: 'outlined',
}
export type LinkProps = LinkHTMLAttributes<HTMLAnchorElement> & NextLinkProps & {
  /** Width of the link */
  width?: string;
  /** Href of the link */
  href: string;
  /** Children of the link */
  children: ReactNode;
  /** Variant of the link */
  variant: Variants;
  /** Data-cy of the link */
  'data-cy'?: string;
} ;
