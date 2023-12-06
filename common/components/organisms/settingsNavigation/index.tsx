import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  NavigationProps, NavigationElement,
} from "./types";
import { getClassNames } from "@/common/utils/helpers";

export const SettingsNavigation = ({ navigationElements }: NavigationProps) => {
  const pathname = usePathname();
  return (
    <aside className="flex overflow-x-auto border-b border-gray-900/5 lg:block lg:w-52 lg:flex-none lg:border-0">
      <nav className="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          {navigationElements.map(({
            id, name, href, icon: Icon, ...rest
          }: NavigationElement) => {
            const isActive = pathname.startsWith(href);
            return (
              <li key={id}>
                <Link
                  href={href}
                  className={getClassNames(
                    isActive
                      ? 'bg-gray-50 text-brand-500'
                      : 'text-text-tertiary hover:text-brand-500 hover:bg-gray-50',
                    'group flex items-center gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold',
                  )}
                  {...rest}
                >
                  <Icon
                    className={getClassNames(
                      isActive ? 'text-brand-500' : 'text-text-tertiary group-hover:text-brand-500',
                      'h-5 w-5 shrink-0',
                    )}
                    aria-hidden="true"
                  />
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
