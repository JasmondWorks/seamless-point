"use client";
import { useEffect } from "react";

import { PDFDocument } from "pdf-lib";
import { useState } from "react";

const PdfThumbnail = ({ file }: { file: File }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const page = pdfDoc.getPage(0); // Get the first page

      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render page to canvas
        await page.render({ canvasContext: context, viewport }).promise;
        setThumbnail(canvas.toDataURL("image/png"));
      }
    };

    generateThumbnail().catch((error) => console.error(error));
  }, [file]);

  return thumbnail ? (
    <img
      src={thumbnail}
      alt="PDF Thumbnail"
      className="max-h-32 rounded-md shadow-md cursor-pointer"
    />
  ) : (
    <p>Loading thumbnail...</p>
  );
};
