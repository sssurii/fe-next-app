import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInDTO } from "@/app/account/types";
import { routes } from "@/common/routes";

const isRememberOption = false;

export const useSignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<SignInDTO> = async (data) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    } );

    if (result?.error && result?.error !== "CredentialsSignin") {
      toast.error(result.error)
    } else {
      router.push(routes.dashboardPath);
    }
    setIsLoading(false);
  };

  return {
    onSubmit,
    isLoading,
    isRememberOption,
  }
}
