import toast from "react-hot-toast";

type ToastType = "success" | "error" | "info";

let toastId: string | undefined;

export const showToast = (message: string, type: ToastType = "info") => {
  // Dismiss any existing toast before showing a new one
  if (toastId) {
    toast.dismiss(toastId);
  }

  const toastConfig = {
    duration: 3000,
    style: {
      background:
        type === "success"
          ? "#4CAF50"
          : type === "error"
          ? "#F44336"
          : "#2196F3",
      color: "#fff",
    },
  };

  switch (type) {
    case "success":
      toastId = toast.success(message, toastConfig);
      break;
    case "error":
      toastId = toast.error(message, toastConfig);
      break;
    case "info":
      toastId = toast(message, {
        ...toastConfig,
        icon: "ℹ️",
      });
      break;
    default:
      toastId = toast(message, {
        ...toastConfig,
        icon: "ℹ️",
      });
  }

  return toastId;
};
