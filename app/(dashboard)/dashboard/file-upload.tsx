"use client";

import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function FileUpload() {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const formData = new FormData();

    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

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

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="resume">Resume</Label>
        <Input
          id="resume"
          {...register("file")}
          type="file"
          accept=".pdf, .md, .txt, .doc, .docx"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Button type="submit">Upload</Button>
      </div>
    </form>
  );
}
