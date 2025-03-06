"use client";

import { useState, useRef, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Resume } from "@/lib/types/resume";

export function ResumeUpload() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [processing, setProcessing] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const acceptedFileTypes = ".pdf, .md, .txt, .doc, .docx";

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading file:", file);
    setProcessing(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/parse", {
        method: "PUT",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);

      setProcessing(false);
      setResume(result.data.resume);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      handleUpload(files[0]);
    }
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragActive(false);

      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
        // Check if the file type is valid
        const file = files[0];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const validTypes = acceptedFileTypes
          .split(", ")
          .map((type) => type.replace(".", ""));

        if (fileExtension && validTypes.includes(fileExtension)) {
          if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
          }
        } else {
          alert(`Invalid file type. Please upload: ${acceptedFileTypes}`);
        }
      }
    },
    [acceptedFileTypes],
  );

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col space-y-4 flex-1">
      <div className="flex flex-col space-y-2 flex-1">
        <Label htmlFor="resume" className="sr-only">
          Resume
        </Label>
        <input
          id="resume"
          type="file"
          className="hidden"
          accept={acceptedFileTypes}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div
          onClick={openFileDialog}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-md p-6 grid place-items-center cursor-pointer transition-colors flex-1
            ${isDragActive ? "border-indigo-500 bg-indigo-500/10 text-indigo-500" : "border-border hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-500"} ${fileName ? "pointer-events-none border-indigo-500/50 text-indigo-500/60" : ""}`}
        >
          {fileName ? (
            <div className="flex flex-col items-center">
              <p className="text-lg font-medium">
                {processing
                  ? "Processing... this could take a few seconds"
                  : "Extracted resume info below"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{fileName}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="font-medium text-lg">
                Drag and drop your resume here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {acceptedFileTypes}
              </p>
            </div>
          )}
        </div>
      </div>
      {resume && (
        <div className="p-8 rounded-md bg-indigo-500/10 text-indigo-200 border border-indigo-500/50 flex-1 overflow-auto">
          {JSON.stringify(resume, null, 2)}
        </div>
      )}
    </div>
  );
}
