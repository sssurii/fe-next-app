import {
  useGetUserDetails, useUpdateUserDetails,
} from "@/app/(protected)/settings/general/userInformation/hooks";
import { Loader } from "@/common/components/molecules";
import { Form } from "@/app/(protected)/settings/general/userInformation/form";
import { SettingsHeader } from "@/common/components/molecules/headers";
import lang from "@/common/lang";

const { settings: { general } } = lang;
export const UserInformation = () => {
  const {
    userDetails, isLoading, isValidating,
  } = useGetUserDetails();
  const {
    onUserDetailsUpdate, isUpdatingUserDetails,
  } = useUpdateUserDetails();

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-4 sm:gap-y-10 md:grid-cols-3 mt-8 sm:mt-16">
        {(isLoading || isValidating || isUpdatingUserDetails) && <Loader />}
        <SettingsHeader headerText={general.userInfoHeader} descriptionText={general.userInfoDescription} />
        <div className="rounded-xl shadow-sm border border-gray-200 col-span-2">
          <Form
            userDetails={userDetails}
            onUserDetailsUpdate={onUserDetailsUpdate}
            isUpdatingUserDetails={isUpdatingUserDetails}
          />
        </div>
      </div>
    </>
  )
}
