import { Typography } from "@/common/components/atoms";

type UserInitialsProps = {
  initials: string;
  showIndicator?: boolean;
}
export const UserInitials = ({
  initials, showIndicator,
}: UserInitialsProps) => {
  return (
    <div className="w-[32px] h-[32px] relative rounded-full bg-brand-500 flex items-center justify-center">
      <Typography variant="p" classes="text-white text-sm">
        {initials}
      </Typography>
      {showIndicator && (
        <span className="w-2 h-2 rounded-full bg-brand-500 border border-white absolute top-0 left-0"> </span>
      )}
    </div>
  )
}
