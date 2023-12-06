import { useSearchParams } from 'next/navigation'
import { filterItems } from "@/app/(protected)/settings/notifications/constants";
import { NavigationItem } from "@/common/components/molecules";

export const Filters = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || '';
  return (
    <>
      {filterItems.map((item) => {
        const isActive = filter === item.id;
        return <NavigationItem key={item.id} isActive={isActive} {...item} />
      })}
    </>
  )
}
