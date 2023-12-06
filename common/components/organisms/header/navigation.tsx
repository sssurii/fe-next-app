import { navigation } from "@/common/components/organisms/header/data";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/common/components/molecules";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <>
      {navigation.map((navItem) => {
        const isActive = pathname.startsWith(navItem.href);
        return <NavigationItem key={navItem.label} isActive={isActive} {...navItem} />
      })}
    </>
  )
}
