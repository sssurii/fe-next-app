import {
  AlertErrorIcon, AlertSuccessIcon,
} from "@/common/components/icons";

export const toasterConfig = {
  toastOptions: {
    duration: 5000,
    success: {
      icon: <AlertSuccessIcon className="text-white fill-green-400 mr-3" />,
    },
    error: {
      icon: <AlertErrorIcon className="text-white fill-red-400 mr-3" />,
    },
  },
  containerStyle: {
    left: 30,
    bottom: 30,
  },
}
