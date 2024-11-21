import toast from "react-hot-toast";

export const handleCopyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Copied to clipboard:", text);
      toast.success(`${text} copied to clipboard`);
    })
    .catch((err) => {
      console.error("Failed to copy to clipboard:", err);
    });
};
