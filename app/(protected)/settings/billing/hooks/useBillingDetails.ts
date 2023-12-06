import useSWR from 'swr';
import dayjs from "dayjs";
import { BillingDetailsResponse } from "@/app/(protected)/settings/billing/types";
import { userSubscriptionUrl } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { dateFormats } from "@/common/constants";
import { routes } from "@/common/routes";
import lang from "@/common/lang";

const { settings: { billing: { undefinedPaymentDetails } } } = lang;

export const useBillingDetails = () => {
  const result = useSWR<BillingDetailsResponse>(userSubscriptionUrl, url => fetcher(
    url,
  ), { revalidateOnFocus: false });

  const {
    data, isLoading, error,
  } = result;

  const {
    payment, subscription, billing_portal_url,
  } = data?.data || {};

  const expiryMonth = payment?.details?.exp_month;
  const expiryYear = payment?.details?.exp_year;
  let expiresAt = undefinedPaymentDetails;
  if (expiryYear && expiryMonth) {
    expiresAt = dayjs(`${expiryYear}-${expiryMonth}`).format(dateFormats.monthYearShort);
  }
  let updatedAt = undefinedPaymentDetails;
  if (subscription?.updated_at) {
    updatedAt = dayjs(subscription?.updated_at).format(dateFormats.default);
  }
  const lastFour = payment?.details?.last_4 || undefinedPaymentDetails;
  const paymentMethod = payment?.type || undefinedPaymentDetails;
  const billingPortalUrl = billing_portal_url || routes.billingSettingsPath;

  return {
    billingPortalUrl,
    paymentMethod,
    lastFour,
    updatedAt,
    expiresAt,
    isLoading,
    error,
  }
}
