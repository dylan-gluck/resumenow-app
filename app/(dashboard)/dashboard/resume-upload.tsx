"use client";

import { useState, useRef, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Resume } from "@/lib/types/resume";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Check,
  FileStack,
  Loader,
  RotateCcw,
  ScanEye,
  Wand2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export function ResumeUpload() {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [resume, setResume] = useState<Resume | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
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
      setUploading(true);

      setTimeout(() => {
        setUploading(false);
        setFileName(files[0].name);
        handleUpload(files[0]);
      }, 2000);
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

  interface CardUploadProps {
    fileName: string;
    uploading: boolean;
  }

  function CardUpload({ fileName, uploading }: CardUploadProps) {
    return (
      <Card>
        {uploading ? (
          <CardContent className="flex space-x-6">
            <div className="aspect-square grid place-items-center bg-primary/10 text-primary rounded-sm">
              <Loader className="animate-spin" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Uploading Document</h3>
              <p className="text-sm text-gray-500">
                Please wait while your resume is being uploaded.
              </p>
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex space-x-6">
            <div className="aspect-square w-13 h-13 grid place-items-center bg-primary/10 text-primary rounded-sm">
              <Check />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Upload Complete</h3>
              <p className="text-sm text-gray-500">{fileName}</p>
            </div>
          </CardContent>
        )}
      </Card>
    );
  }

  interface CardExtractProps {
    fileName: string;
    processing: boolean;
  }

  function CardExtract({ fileName, processing }: CardExtractProps) {
    return (
      <Card className={`${fileName ? "" : "blur-xs"}`}>
        {processing ? (
          <CardContent className="flex space-x-6">
            <div className="aspect-square grid place-items-center bg-primary/10 text-primary rounded-sm">
              <Loader className="animate-spin" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Processing...</h3>
              <p className="text-sm text-gray-500">
                Extracing resume information and formatting it for analysis
              </p>
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex space-x-6">
            <div className="aspect-square w-13 h-13 grid place-items-center bg-primary/10 text-primary rounded-sm">
              <Check />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Extraction Complete</h3>
              <p className="text-sm text-gray-500">
                Resume information ready for review
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    );
  }

  interface ResumeReviewProps {
    resume: Resume | null;
  }

  function CardReview({ resume }: ResumeReviewProps) {
    return (
      <Card className={`${!resume ? "blur-xs" : ""}`}>
        <CardContent className="flex space-x-6">
          <div className="aspect-square w-13 h-13 grid place-items-center bg-primary/10 text-primary rounded-sm">
            <ScanEye />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Review Your Information</h3>
            <p className="text-sm text-gray-500">
              Make any changes and click save to continue
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  function CardCompare({ resume }: ResumeReviewProps) {
    return (
      <Card className={`${!resume ? "blur-xs" : ""}`}>
        <CardContent className="flex space-x-6">
          <div className="aspect-square w-13 h-13 grid place-items-center bg-primary/10 text-primary rounded-sm">
            <FileStack />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">How do you stack up?</h3>
            <p className="text-sm text-gray-500">
              Rate your skills and experience against your competitors
            </p>
          </div>
        </CardContent>
        <CardContent className="flex flex-col space-y-4 flex-1">
          <div className="space-y-2">
            <Label htmlFor="search_title">Job Title</Label>
            <Select name="search_title" defaultValue="staff">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a job title" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="staff">Staff Software Engineer</SelectItem>
                  <SelectItem value="senior">
                    Senior Software Engineer
                  </SelectItem>
                  <SelectItem value="lead">Lead Software Engineer</SelectItem>
                  <SelectItem value="principal">
                    Principal Software Engineer
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="search_location">Location</Label>
            <Select name="search_location" defaultValue="ny">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="sf">San Francisco</SelectItem>
                  <SelectItem value="la">Los Angeles</SelectItem>
                  <SelectItem value="chi">Chicago</SelectItem>
                  <SelectItem value="dc">Washington, D.C.</SelectItem>
                  <SelectItem value="mia">Miami</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="p-4 bg-primary/10 mt-auto rounded-md space-y-2">
            <Label className="justify-between">
              Current Fit <span className="text-yellow-600">6/10</span>
            </Label>
            <Progress value={60} className="w-full" />
          </div>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          <Button variant="outline">
            <RotateCcw />
            <span>Check Again</span>
          </Button>
          <Button variant="outline">
            <Wand2 />
            <span>Suggest Improvements</span>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  function ResumeReview({ resume }: ResumeReviewProps) {
    return (
      <div className={"flex flex-col space-y-4 flex-1 overflow-auto"}>
        <div className="flex flex-col space-y-4 pb-8 mb-8 border-b border-border/30">
          <div>
            <h2 className="text-2xl">Contact Information</h2>
            <p className="text-muted-foreground">Who, what, where?</p>
          </div>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-24" />
        </div>
        <div className="flex flex-col space-y-4 pb-8 mb-8 border-b border-border/30">
          <div>
            <h2 className="text-2xl">Education</h2>
            <p className="text-muted-foreground">
              Highlight your academic achievements
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 pb-8 mb-8 border-b border-border/30">
          <div>
            <h2 className="text-2xl">Work Experience</h2>
            <p className="text-muted-foreground">
              Show how your experience shines
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 pb-8 mb-8 border-b border-border/30">
          <div>
            <h2 className="text-2xl">Projects</h2>
            <p className="text-muted-foreground">
              Show how your experience shines
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 flex-1">
      {(uploading || fileName) && (
        <div className="flex items-stretch gap-8 flex-1">
          <div className="flex flex-col space-y-4 flex-1 transition transition-discrete delay-150 duration-300 ease-in-out">
            <CardUpload fileName={fileName} uploading={uploading} />
            <CardExtract fileName={fileName} processing={processing} />
            <CardReview resume={resume} />
            <CardCompare resume={resume} />
          </div>
          {resume && (
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-auto bg-border/30"
            />
          )}
          {resume && (
            <div className="flex flex-col space-y-4 flex-1 overflow-auto">
              <ResumeReview resume={resume} />
            </div>
          )}
        </div>
      )}
      {!uploading && !fileName && (
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
            className={`
            border-2 border-dashed rounded-md p-6 grid place-items-center cursor-pointer transition-colors flex-1
            ${isDragActive ? "border-indigo-500 bg-indigo-500/10 text-indigo-500" : "border-border hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-500"}
          `}
          >
            <div className="flex flex-col items-center">
              <p className="font-medium text-lg">
                Drag and drop your resume here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {acceptedFileTypes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
