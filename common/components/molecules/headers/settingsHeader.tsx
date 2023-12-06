import { Typography } from "@/common/components/atoms";
import { SettingsHeaderProps } from "@/common/components/molecules/headers/types";

export const SettingsHeader = ({
  headerText, descriptionText,
}: SettingsHeaderProps) => {
  return (
    <div>
      <Typography variant="h6" classes="font-semibold text-text-primary text-base">
        {headerText}
      </Typography>
      <Typography variant="p" classes="text-text-tertiary sm:mt-2 text-sm">
        {descriptionText}
      </Typography>
    </div>
  )
}
