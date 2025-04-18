"use client";
import React, { useEffect, useState } from "react";

export default function ProfileImageUploader({ user }: any) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const defaultImage = user?.profileImg || "/assets/images/avatar.png"; // Replace with your default image URL

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleImageUpload = () => {
    if (image) {
      // Upload the image logic here
      console.log("Uploading image:", image);
    } else {
      console.error("No image selected");
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="relative w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden"
        style={{
          backgroundImage: `url(${imagePreview || defaultImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <div className="mt-4">
        {image && (
          <button
            onClick={handleImageUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
