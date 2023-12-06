'use client';
import {
  Link, Typography,
} from "@/common/components/atoms";
import { useBillingDetails } from "@/app/(protected)/settings/billing/hooks";
import { CreditCardTypes } from "@/app/(protected)/settings/billing/types";
import { VisaIcon } from "@/common/components/icons";
import { Loader } from "@/common/components/molecules";
import lang from "@/common/lang";

const { settings: { billing } } = lang;
const unicodeDot = "\u2022";

const creditCardLogos: CreditCardTypes = {
  visa: <VisaIcon />,
}

export const BillingDetails = () => {
  const {
    expiresAt, updatedAt, paymentMethod, lastFour, billingPortalUrl, isLoading,
  } = useBillingDetails();
  return (
    <div className="flex rounded-md bg-grey-50 px-6 py-5 mt-5">
      {isLoading && <Loader />}
      <div className="mr-4">
        {creditCardLogos[paymentMethod]}
      </div>
      <div className="grid-rows-2">
        <Typography variant="p" classes="text-text-primary font-semibold text-sm">
          {`${billing.ending} ${lastFour}`}
        </Typography>
        <Typography variant="p" classes="text-grey-600 mt-1 text-sm">
          {`${billing.expires} ${expiresAt} ${unicodeDot} ${billing.lastUpdated} ${updatedAt}`}
        </Typography>
      </div>
      <div className="ml-auto">
        <Link variant="outlined" href={billingPortalUrl} data-cy="edit-payment-link">
          {billing.edit}
        </Link>
      </div>
    </div>
  )
}
