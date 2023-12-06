import Link from "next/link";
import { NavigationItemProps } from "@/common/components/molecules/navigationItem/types";

export const NavigationItem = ({
  href, label, isActive, ...rest
} : NavigationItemProps) => {
  const classes = isActive ? 'bg-brand-500 text-white' : 'text-text-primary';
  return (
    <Link
      href={href}
      className={`py-2 px-3 text-sm rounded-md hover:bg-brand-300 hover:text-white ${classes}`}
      {...rest}
    >
      {label}
    </Link>
  )
}
