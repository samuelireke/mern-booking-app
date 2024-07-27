import { useEffect } from "react";
import { toast } from "react-toastify";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const toastId: string = "toast_id";

const Toast = ({ message, type, onClose }: ToastProps) => {
  const showToast = () => {
    if (type === "SUCCESS") {
      toast.success(message, { toastId, pauseOnFocusLoss: false });
    } else {
      toast.error(message, { toastId, pauseOnFocusLoss: false });
    }
  };
  useEffect(() => {
    showToast();
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }),
    [];
  return <></>;
};

export default Toast;
