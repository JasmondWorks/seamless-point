import { Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { base64ToFile } from "@/app/_lib/utils";

const FileInput = ({ props, field }: { props: any; field: any }) => {
  const [fileName, setFileName] = useState<string>(props?.selectedFile?.name);
  const selectedFile = {
    file: base64ToFile(props?.selectedFile?.base64File),
    name: props?.selectedFile?.name,
  };
  const [filePreview, setFilePreview] = useState<string | null>(
    selectedFile.file ? URL.createObjectURL(selectedFile.file) : ""
  );
  const [fileType, setFileType] = useState<string>(
    selectedFile.file ? selectedFile.file.type : ""
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileType(file.type);
      field.onChange(file);
      // props?.addToStore(file, props.fieldName);

      // Generate a preview URL for the file
      setFilePreview(URL.createObjectURL(file));
    }
  };

  console.log(filePreview);

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
        disabled={props.disabled}
        type="file"
        accept={props.accept}
        className="hidden"
        id={props.name}
        onChange={handleFileChange}
      />

      {/* Display the uploaded file name */}
      {fileName && (
        <p className="text-xs text-gray-600">Selected file: {fileName}</p>
      )}

      {/* Display the preview if available */}
      {filePreview && (
        <div className="mt-3">
          {fileType.startsWith("image/") ? (
            <Dialog>
              <DialogTrigger>
                <img
                  src={filePreview}
                  alt={fileName}
                  className="max-h-32 rounded-md shadow-md cursor-pointer"
                />
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>File Preview</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                  <img
                    src={filePreview}
                    alt={fileName}
                    className="object-contain"
                  />
                </div>
                <DialogClose>Close</DialogClose>
              </DialogContent>
            </Dialog>
          ) : fileType === "application/pdf" ? (
            <a
              href={filePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 underline"
            >
              View PDF
            </a>
          ) : (
            <p className="text-sm text-gray-500">
              Preview not available for this file type.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FileInput;
