import { WarningIcon } from "@/common/components/icons";

type WarningProps = {
  showIndicator?: boolean;
}

export const Warning = ({ showIndicator }: WarningProps) => {
  return (
    <div className="w-[32px] h-[32px] relative rounded-full bg-red-200 flex items-center justify-center">
      <WarningIcon className="h-5 w-5 fill-red-600" />
      {showIndicator && (
        <span className="w-2 h-2 rounded-full bg-red-600 border border-white absolute top-0 left-0"> </span>
      )}
    </div>
  )
}
