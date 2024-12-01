"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/app/_lib/utils";
import { Plus } from "lucide-react";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange, title }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <div className="rounded-lg bg-white space-y-5 p-5">
          <h3 className="font-semibold text-xl">{title}</h3>
          <div className="text-center flex flex-col items-center border border-dashed gap-3 border-neutral-200 rounded-md p-2 cursor-pointer">
            <span>
              Browse and choose the files you want to upload from your computer
            </span>
            <div className="bg-[#37c1f9] h-9 w-9 rounded-md font-bold grid place-items-center !leading-none">
              <Plus color="white" size={20} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
