import { useEffect, useState } from "react";
import { PDFDocumentProxy, getDocument } from "pdfjs-dist";

export default function PdfThumbnail({ file }: { file: File }) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      const loadingTask = getDocument(URL.createObjectURL(file));
      const pdf: PDFDocumentProxy = await loadingTask.promise;
      const page = await pdf.getPage(1); // Get the first page
      const viewport = page.getViewport({ scale: 0.5 }); // Set scale for thumbnail size
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        setThumbnail(canvas.toDataURL());
      }
    };

    generateThumbnail();
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
}
