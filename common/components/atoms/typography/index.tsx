import {
  ElementType, ReactElement,
} from "react";
import { TypographyProps } from "./types";

export const Typography = ({
  variant, classes = '', children, ...rest
}: TypographyProps): ReactElement => {
  const Component: ElementType = variant || 'span';
  return (
    <Component className={`${classes}`} {...rest}>
      {children}
    </Component>
  );
}
