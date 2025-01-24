// ConfirmToast.js
import React from "react";
import toast from "react-hot-toast";

const ConfirmToast = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return toast.custom((t) => (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <p style={{ margin: 0 }}>{message || "Are you sure?"}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => {
            onConfirm();
            toast.dismiss(t.id); // Close the toast
          }}
          style={{
            padding: "8px 12px",
            background: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Confirm
        </button>
        <button
          onClick={() => {
            if (onCancel) onCancel(); // Optional cancel callback
            toast.dismiss(t.id);
          }}
          style={{
            padding: "8px 12px",
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  ));
};

export default ConfirmToast;
