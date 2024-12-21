import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FilePond, File } from "react-filepond";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "filepond/dist/filepond.min.css";

const FileInput = ({ props, field }: { props: any; field: any }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Handle file drop using react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFiles([file]);
        setFilePreview(URL.createObjectURL(file)); // For previewing non-PDF files
        field.onChange(file);
        props?.addToStore(file, props.fieldName);
      }
    },
  });

  const handleFilePondChange = (fileItems: File[]) => {
    setFiles(fileItems);
    const file = fileItems[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file.file)); // For previewing non-PDF files
      field.onChange(file.file);
      props?.addToStore(file.file, props.fieldName);
    }
  };

  const file = files[0];

  return (
    <div className="file-input-container">
      {/* React Dropzone */}
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop a file here, or click to select a file</p>
      </div>

      {/* FilePond Upload */}
      <FilePond
        files={files}
        onupdatefiles={handleFilePondChange}
        allowMultiple={false}
        acceptedFileTypes={[
          "image/*",
          "application/pdf",
          "application/msword",
          "text/*",
        ]}
      />

      {/* Preview File */}
      {file && (
        <div className="file-preview mt-3">
          {file.type.startsWith("image/") && filePreview && (
            <img
              src={filePreview}
              alt={file.name}
              className="max-h-32 rounded-md shadow-md"
            />
          )}

          {file.type === "application/pdf" && filePreview && (
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.0.0/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={filePreview} />
            </Worker>
          )}

          {!file.type.startsWith("image/") &&
            file.type !== "application/pdf" &&
            filePreview && (
              <a
                href={filePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 underline"
              >
                View File
              </a>
            )}
        </div>
      )}

      {/* Display the uploaded file name */}
      {file && (
        <p className="text-xs text-gray-600">Selected file: {file.name}</p>
      )}
    </div>
  );
};

export default FileInput;
