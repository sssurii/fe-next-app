import { Dropdown } from "@/common/components/molecules";
import { MenuProps } from "@/common/components/organisms/header/types";
import lang from "@/common/lang";
const { header } = lang;

export const Menu = ({
  userAvatarImage: UserAvatarImage, options,
}: MenuProps) => {
  return (
    <div className="hidden lg:flex lg:flex-1">
      <div className="flex">
        <Dropdown
          options={options}
          icon={UserAvatarImage}
          data-cy="profile-dropdown"
          aria-label={header.ariaLabels.openMenu}
        />
      </div>
    </div>
  )
}
