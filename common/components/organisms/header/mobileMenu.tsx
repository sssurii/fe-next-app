import { MobileMenuProps } from "@/common/components/organisms/header/types";
import lang from "@/common/lang";
const { header } = lang;
export const MobileMenu = ({
  openMobileMenu, userAvatarImage: UserAvatarImage,
}: MobileMenuProps) => {
  return (
    <div className="flex lg:hidden">
      <button
        type="button"
        className="inline-flex items-center justify-center"
        onClick={openMobileMenu}
        data-cy="opens-settings-menu"
        aria-label={header.ariaLabels.openMenu}
      >
        <UserAvatarImage />
      </button>
    </div>
  )
}
