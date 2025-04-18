import { Plus } from "lucide-react";
import React, { useState } from "react";

import Files from "react-files";

const FileUpload = ({ props }) => {
  const handleChange = (files) => {
    console.log(files);
  };

  const handleError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
  };

  return (
    <Files
      className="files-dropzone"
      onChange={handleChange}
      onError={handleError}
      accepts={["image/png", ".pdf", "audio/*"]}
      multiple
      maxFileSize={10000000}
      minFileSize={0}
      clickable
    >
      <div className="rounded-lg bg-white space-y-5 p-5">
        <h3 className="font-semibold text-xl">{props.title}</h3>
        <div className="text-center flex flex-col items-center border border-dashed gap-3 border-neutral-200 rounded-md p-2 cursor-pointer">
          <span>
            Browse and choose the files you want to upload from your computer
          </span>
          <div className="bg-[#37c1f9] h-9 w-9 rounded-md font-bold grid place-items-center !leading-none">
            <Plus color="white" size={20} />
          </div>
        </div>
      </div>
    </Files>
  );
};

export default FileUpload;
