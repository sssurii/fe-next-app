import Stripe from 'stripe';
import {
  NextRequest, NextResponse,
} from "next/server";
import { headers } from "next/headers";
import {
  httpRequestMethods, httpResponseStatuses,
} from "@/common/utils/network/constants";
import lang from "@/common/lang";

const { responseErrorMessages: {
  serverError, methodNotAllowed,
} } = lang;
const productPriceId = process?.env?.NEXT_PUBLIC_STRIPE_PRODUCT_PRICE_ID || '';
const {
  INTERNAL_SERVER_ERROR, SEE_OTHER, METHOD_NOT_ALLOWED,
} = httpResponseStatuses;

// FIXME: something is wrong with types provided by stripe-node
const config = {
  apiVersion: "2022-11-15" as const,
  appInfo: {
    name: "stripe-samples/accept-a-payment",
    url: "https://github.com/stripe-samples",
    version: "0.0.2",
  },
  typescript: true as const,
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, config);

export async function POST (req: NextRequest) {
  const requestHeaders = headers();
  const origin = requestHeaders.get('origin');
  const body = await req.json();
  const email = body.email;

  if (req.method !== httpRequestMethods.POST) {
    return new Response(methodNotAllowed, {
      status: METHOD_NOT_ALLOWED,
      headers: { Allow: httpRequestMethods.POST },
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: productPriceId,
          quantity: 1,
        },
      ],
      customer_email: email || '',
      mode: 'subscription',
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });
    const url = session.url as string;
    return NextResponse.json({ url }, { status: SEE_OTHER });
  } catch (err) {
    if (err instanceof Error) {
      console.error({ err });
      return new Response(err.message, { status: INTERNAL_SERVER_ERROR });
    }
    return new Response(serverError, { status: INTERNAL_SERVER_ERROR });
  }
}
