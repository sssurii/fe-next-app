import { ReactNode } from "react";

export type CreditCardTypes = {
  [key: string]: ReactNode;
};

export type BillingDetailsResponse = {
  data: {
    billing_portal_url: string;
    subscription: {
      status: string,
      created_at: string,
      updated_at: string,
      quantity: number,
      ends_at: string | null,
      on_trial: boolean,
      trial_ends_at: string | null,
    },
    payment: {
      type: string,
      details: {
        brand: string,
        last_4: string,
        exp_month: number,
        exp_year: number,
      }
    },
  }
}
