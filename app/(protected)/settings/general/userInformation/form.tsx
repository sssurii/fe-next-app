import {
  Controller, useForm,
} from "react-hook-form";
import { Input } from "@/common/components/molecules";
import {
  Button, Typography,
} from "@/common/components/atoms";
import React, { useEffect } from "react";
import {
  UserDetailsDTO, UserDetailsProps,
} from "@/app/(protected)/settings/general/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { userDetailsValidationSchema } from "@/app/(protected)/settings/general/validationSchema";
import { userDetailsFormInputs } from "@/app/(protected)/settings/general/userInformation/data";
import lang from "@/common/lang";

const {
  settings: { general }, signUp: signUpCopy,
} = lang;

export const Form = ({
  userDetails,
  onUserDetailsUpdate,
  isUpdatingUserDetails,
}: UserDetailsProps) => {
  const {
    handleSubmit,
    control,
    reset,
  } = useForm<UserDetailsDTO>({
    resolver: yupResolver(userDetailsValidationSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (userDetails) {
      const {
        firstName, lastName, email,
      } = userDetails;
      reset({
        firstName,
        lastName,
        email,
        newEmail: '',
        confirmationEmail: '',
      });
    }
  }, [reset, userDetails]);

  return (
    <form onSubmit={handleSubmit(onUserDetailsUpdate)}>
      <div className="p-8">
        <div className="w-full flex flex-wrap sm:justify-between">
          {userDetailsFormInputs.map(({
            name, disabled, size, ...rest
          }) => {
            const containerSizeClasses = size ? `sm:w-[${size}]` : '';
            return (
              <div key={name} className={`flex w-full mb-5 ${containerSizeClasses}`}>
                <Controller
                  control={control}
                  name={name}
                  render={({
                    field, fieldState,
                  }) => {
                    const { error } = fieldState;
                    const {
                      ref, ...fieldProperties
                    } = field;
                    return (
                      <Input
                        width="w-full"
                        id={field.name}
                        labelText={signUpCopy[name]}
                        error={!!error}
                        errorMessage={error?.message}
                        readOnly={disabled}
                        disabled={disabled}
                        {...rest}
                        {...fieldProperties}
                      />
                    );
                  }}
                />
              </div>
            )
          })}
        </div>
        <Typography variant="p" classes="text-text-secondary text-sm">
          {general.emailChangeInfo}
        </Typography>
      </div>
      <div className="border-t border-gray-200 px-8 py-4">
        <Button
          type="submit"
          variant="solid"
          size="sm"
          data-cy="save_user_details"
          disabled={isUpdatingUserDetails}
        >
          {signUpCopy.save}
        </Button>
      </div>
    </form>
  )
}
