import { useMemo } from "react";
import NextLink from "next/link";
import { LinkProps } from "./types";
import { TVariants } from "@/common/components/atoms/link/types";
import { themeElements } from "@/common/theme/themeElements";

const getVariantClasses = (variant: keyof typeof TVariants) => themeElements.links[variant].style;

export const Link = ({
  width = 'w-fit', href, children, variant = 'outlined', ...rest
}: LinkProps) => {
  const computedClasses = useMemo(() => {
    return getVariantClasses(variant);
  }, [variant]);

  return (
    <NextLink href={href}
      className={`${width} ${computedClasses}`}
      {...rest}
    >
      {children}
    </NextLink>
  )
}
