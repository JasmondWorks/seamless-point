"use client";
import Button, { ButtonVariant } from "@/app/_components/Button";
import Spinner from "@/app/_components/Spinner";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";
import { updateAdmin, updateUser } from "@/app/_lib/actions";
import { uploadFile } from "@/app/_lib/utils";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileImageUploader({ user }: any) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const defaultImage = user?.profileImage || "/assets/images/avatar.png"; // Replace with your default image URL
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserAuth();

  console.log(user);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleImageUpload = async () => {
    if (!image) return console.error("No image selected");

    // Upload the image logic here

    setIsLoading(true);
    const profileImageUrl = await uploadFile(
      image,
      "profile-image",
      "profile-image",
      true
    );
    console.log(profileImageUrl);

    if (!profileImageUrl) return;

    const updatedUser =
      user.role === "user"
        ? await updateUser({ profileImage: profileImageUrl })
        : await updateAdmin({ profileImage: profileImageUrl });

    if (updatedUser.status === "success") {
      toast.success("Profile image updated successfully");
      setUser(updatedUser.user);
      setImage(null);
    }
    console.log(updatedUser);

    setIsLoading(false);
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
          <Button
            variant={ButtonVariant.fill}
            disabled={isLoading}
            onClick={handleImageUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            {isLoading ? (
              <div className="flex gap-2 items-center">
                <Spinner color="text" size="small" />
                <span>Uploading</span>
              </div>
            ) : (
              "Upload"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
