import { Typography } from "@/common/components/atoms";
import lang from "@/common/lang";

const { settings: { billing } } = lang;
export const NoPaymentMethodInfo = () => {
  return (
    <Typography variant="p" classes="text-text-tertiary leading-7 text-sm">
      {billing.noPaymentMethod}
    </Typography>
  )
}
