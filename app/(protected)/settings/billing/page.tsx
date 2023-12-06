'use client';
import { Loader } from "@/common/components/molecules";
import { Typography } from "@/common/components/atoms";
import { useGetUserDetails } from "@/app/(protected)/settings/general/userInformation/hooks";
import { BillingDetails } from "@/app/(protected)/settings/billing/billingDetails";
import { NoPaymentMethodInfo } from "@/app/(protected)/settings/billing/noPaymentMethodInfo";
import { SettingsHeader } from "@/common/components/molecules/headers";
import lang from "@/common/lang";

const { settings: { billing } } = lang;

const Billing = () => {
  const {
    userDetails, isLoading,
  } = useGetUserDetails();

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3 lg:pr-8">
      {isLoading && <Loader />}
      <SettingsHeader headerText={billing.header} descriptionText={billing.description} />
      <div className="rounded-xl shadow-sm border border-gray-200 px-4 py-5 col-span-2">
        <Typography variant="h6" classes="font-semibold text-text-primary text-base">
          {billing.paymentMethod}
        </Typography>
        {userDetails?.hasSubscribed
          ? (
            <BillingDetails />
          ) : (
            <NoPaymentMethodInfo />
          )}
      </div>
    </div>
  )
}

export default Billing;
