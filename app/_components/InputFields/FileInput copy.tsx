import { Plus } from "lucide-react";
import React, { useState } from "react";

const FileInput = ({ props, field }: { props: any; field: any }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file, props.fieldName);
      setFileName(file.name); // Update the state with the file name
      field.onChange(file);
      props?.addToStore(file, props.fieldName);
    }
  };

  return (
    <div className="rounded-lg bg-white space-y-5 p-5">
      <h3 className="font-semibold">{props.title}</h3>
      <label
        htmlFor={props.name}
        className="text-center flex flex-col items-center border border-dashed gap-3 border-neutral-200 rounded-md p-2 cursor-pointer"
      >
        <span className="text-sm text-gray-600">
          Browse and choose the files you want to upload from your computer
        </span>
        <div className="bg-[#37c1f9] h-9 w-9 rounded-md font-bold grid place-items-center !leading-none">
          <Plus color="white" size={20} />
        </div>
      </label>
      <input
        type="file"
        className="hidden"
        id={props.name}
        onChange={handleFileChange}
      />

      {/* Display the uploaded file name if available */}
      {fileName && (
        <p className="text-xs text-gray-600">Selected file: {fileName}</p>
      )}
    </div>
  );
};

export default FileInput;
