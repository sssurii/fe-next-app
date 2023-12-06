import { Input } from "@/common/components/molecules";
import {
  SearchIcon, UsersGroupIcon,
} from "@/common/components/icons";
import { headerProps } from "@/app/(protected)/team/users/types";
import { Typography } from "@/common/components/atoms";
import lang from "@/common/lang";

const { team } = lang;

export const Header = ({
  searchValue, onChange, membersCount,
}: headerProps) => {
  return (
    <div className="w-full flex justify-between items-center sm:px-6 lg:px-8 mb-4">
      <div className="flex">
        <UsersGroupIcon />
        <Typography variant="span" classes="text-text-primary text-sm font-medium ml-2" data-cy="team-members-count">
          {`${membersCount} ${team.members}`}
        </Typography>
      </div>
      <Input
        id="search"
        name="search"
        placeholder={team.search}
        width="w-[280px]"
        icon={SearchIcon}
        onChange={onChange}
        value={searchValue}
        data-cy="search-input"
      />
    </div>
  )
}
