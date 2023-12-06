import {
  NextRequest, NextResponse,
} from 'next/server';
import { get } from '@vercel/edge-config';
import { getServerSession } from "next-auth/next"
import { httpResponseStatuses } from "@/common/utils/network/constants";
import lang from "@/common/lang";

const {
  UNAUTHORIZED, BAD_REQUEST, NOT_FOUND,
} = httpResponseStatuses;
const { responseErrorMessages: {
  unauthorized, specifyFeatureFlag, flagNotFound,
} } = lang;

export async function GET (request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({
      code: UNAUTHORIZED,
      message: unauthorized,
    })
  }

  const { searchParams } = new URL(request.url)
  const flag = searchParams.get('flag')

  if (!flag) {
    return NextResponse.json({
      code: BAD_REQUEST,
      message: specifyFeatureFlag,
    })
  }

  const flagValue = await get(flag);

  if (!flagValue) {
    return NextResponse.json({
      code: NOT_FOUND,
      message: flagNotFound,
    })
  }

  return NextResponse.json({ flagValue })
}

