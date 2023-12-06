'use client';
import { Transition } from "@headlessui/react";
import {
  Toaster as ReactToaster, Toast, ToastIcon, resolveValue,
} from "react-hot-toast";
import { toasterConfig } from "./config";
import { Typography } from "@/common/components/atoms";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const Toaster = () => {
  return (
    <ReactToaster
      {...toasterConfig}
      position="bottom-left"
      data-cy="alert-toast"
    >
      {(toast: Toast) => {
        return (
          <Transition
            appear
            show={toast.visible}
            className={classNames(
              'transform p-4 rounded-md flex items-center',
              toast.type === 'success' ? 'bg-green-50' : 'bg-red-50',
            )}
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <ToastIcon toast={toast} />
            <Typography
              variant="p"
              classes={classNames(
                toast.type === 'success' ? 'text-green-800' : 'text-red-800',
                'text-sm',
              )}
              data-cy="alert-toast-content"
            >
              {resolveValue(toast.message, toast)}
            </Typography>
          </Transition>
        )
      }}
    </ReactToaster>
  );
};
