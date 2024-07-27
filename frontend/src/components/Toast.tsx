import { useEffect, useRef } from "react";
import { toast, ToastOptions } from "react-toastify";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  const toastId = useRef<string | number | null>(null);

  useEffect(() => {
    const showToast = () => {
      console.log(toastId.current);
      // Dismiss active toast if it exists
      if (toastId.current !== null) {
        toast.dismiss(toastId.current);
      }

      // Configure toast options
      const options: ToastOptions = {
        toastId: type,
        pauseOnFocusLoss: false,
        autoClose: 5000,
        onClose: () => {
          toastId.current = null;
          onClose();
        },
      };

      // Show toast
      toastId.current =
        type === "SUCCESS"
          ? toast.success(message, options)
          : toast.error(message, options);
    };

    showToast();

    // Cleanup function
    return () => {
      if (toastId.current !== null) {
        toast.dismiss(toastId.current);
      }
    };
  }, [message, type, onClose]); // Dependencies for useEffect

  return null;
};

export default Toast;
