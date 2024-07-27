import { useCallback, useRef } from "react";
import { toast, ToastOptions, Id } from "react-toastify";
import { ToastMessage } from "../types";

export const useToast = () => {
  const toastIds = useRef<Record<string, Id>>({});

  const showToast = useCallback(({ message, type }: ToastMessage) => {
    const options: ToastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      pauseOnFocusLoss: false,
      draggable: true,
    };

    // Create a unique key for this toast
    const key = `${type}-${message}`;

    // If a toast with this key already exists, don't create a new one
    if (toastIds.current[key]) {
      toast.update(toastIds.current[key], {
        ...options,
        render: message,
      });
      return;
    }

    // Dismiss active toast if it exists
    toast.dismiss();

    // Then, create a new toast and store its ID
    const id =
      type === "SUCCESS"
        ? toast.success(message, options)
        : toast.error(message, options);

    toastIds.current[key] = id;

    // Remove the ID from our record when the toast is dismissed
    toast.onChange((toastId) => {
      if (toastId.id === id && toast.isActive(id) === false) {
        delete toastIds.current[key];
      }
    });
  }, []);

  return showToast;
};
