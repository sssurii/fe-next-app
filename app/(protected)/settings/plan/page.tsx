'use client';
import { useState } from "react";
import { useGetUserDetails } from "@/app/(protected)/settings/general/userInformation/hooks";
import PrivateComponent from "@/common/utils/privateComponent";
import { Typography } from "@/common/components/atoms";
import { Toggle } from "@/common/components/molecules";
import StripePricingTable from "./pricingTable";
import PaymentSimple from "./paymentSimple";
import lang from "@/common/lang";

const { payments } = lang;

const Plan = () => {
  const [useSimplifiedCheckout, setUseSimplifiedCheckout] = useState(false);
  useGetUserDetails();
  return (
    <PrivateComponent>
      <div className="flex flex-col justify-center items-center gap-2">
        <Typography variant="h3" classes="mb-6 text-center font-semibold text-text-primary text-3xl">
          {payments.header}
        </Typography>
        <Toggle
          data-cy="payment-toggle"
          classes="my-4"
          labelText="Simplified checkout"
          checked={useSimplifiedCheckout}
          onChange={() => setUseSimplifiedCheckout(!useSimplifiedCheckout)}
        />
        {useSimplifiedCheckout
          ? <PaymentSimple />
          : <div className="w-full"><StripePricingTable /></div>
        }
      </div>
    </PrivateComponent>
  )
}

export default Plan;
