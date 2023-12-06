import {
  ElementType, ReactNode,
} from 'react';

export const TVariants = {
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
  'p': 'p',
  'span': 'span',
}

export type TypographyProps = {
  /** The size of the typography */
  variant: keyof typeof TVariants;
  /** The content of the typography */
  children: ReactNode;
  /** Additional Tailwind classes */
  classes?: string;
}

export type VariantMapping = {
  [key: string] : ElementType
}
