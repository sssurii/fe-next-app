'use client';
import { UserInformation } from "@/app/(protected)/settings/general/userInformation";
import { ProfileImage } from "@/app/(protected)/settings/general/profileImage";

const General = () => {
  return (
    <>
      <ProfileImage />
      <UserInformation />
    </>
  )
}

export default General;
