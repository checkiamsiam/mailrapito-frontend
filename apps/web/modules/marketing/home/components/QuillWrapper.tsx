"use client";

import { apiClient } from "@shared/lib/api-client";
import { toast } from "@ui/hooks/use-toast";
import { useMemo } from "react";
import type ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ font: [] }],
  [{ align: [] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ color: [] }, { background: [] }],
  ["link", "image", "video"],
  ["clean"],
];

interface QuillEditorProps {
  forwardRef?: React.RefObject<ReactQuill>;
  content: string;
  handleEditorChange: (content: string) => void;
}

const QuillWrapper = ({
  forwardRef,
  content,
  handleEditorChange,
}: QuillEditorProps) => {
  const uploadUrlMutation = apiClient.uploads.signedUploadUrl.useMutation();
  const getURLMutation = apiClient.uploads.getSignedUploadedUrl.useMutation();

  const saveToServer = async (file: File): Promise<string> => {
    toast({
      variant: "loading",
      title: "Image uploading",
    });

    // const body = new FormData();
    // body.append("image", file as Blob);

    const path = `${file.name}`;

    try {
      const uploadUrl = await uploadUrlMutation.mutateAsync({
        path,
        bucket: "avatars",
      });

      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "image/png",
        },
      });

      if (!response.ok) {
        toast({
          variant: "error",
          title: "Failed to upload image",
        });
        throw new Error("Failed to upload image");
      }

      toast({
        variant: "loading",
        title: "Fetching image url",
      });

      const cloudUrl = await getURLMutation.mutateAsync({
        path,
        bucket: "avatars",
      });

      // console.log("cloudUrl");

      if (cloudUrl) {
        toast({
          variant: "success",
          title: "Image uploaded",
        });
      } else {
        toast({
          variant: "error",
          title: "Failed to upload image",
        });
        throw new Error("Failed to upload image");
      }
      return cloudUrl;
    } catch (err) {
      console.error("error", err.response?.data);
      throw err;
    }
  };

  // const handleUploadImage = async () => {
  //   console.log("called handleUploadImage");
  //   const quill = quillRef?.current?.getEditor();
  //   console.log("🚀 ~ handleUploadImage ~ quill:", quillRef);

  //   if (quill) {
  //     const input = document.createElement("input");
  //     input.setAttribute("type", "file");
  //     input.click();

  //     input.onchange = async () => {
  //       const file = input.files?.[0];
  //       if (file && file.type.startsWith("image/")) {
  //         const res = await saveToServer(file);
  //         const range = quill.getSelection(true);
  //         if (range) {
  //           quill.insertEmbed(range.index, "image", res.data[0].url);
  //         } else {
  //           quill.clipboard.dangerouslyPasteHTML(
  //             quill.getLength(),
  //             `<img src="${res.data[0].url}" alt=""/>`,
  //           );
  //         }
  //       }
  //     };
  //   }
  // };

  const imageHandler = () => {
    const editor = forwardRef?.current?.getEditor();

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      try {
        const link = await saveToServer(file as File);
        const range = editor?.getSelection(true);
        if (range) {
          editor?.insertEmbed(range.index, "image", link);
        } else {
          editor?.clipboard.dangerouslyPasteHTML(
            editor?.getLength(),
            `<img src="${link}" alt=""/>`,
          );
        }
      } catch (err) {
        console.log("upload err:", err.response?.data);
      }
    };
  };

  const handleChange = (html: string) => {
    handleEditorChange(html);
  };

  const handleOnBlur = () => {
    handleEditorChange(content);
  };

  const qModule = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
        clipboard: {
          matchVisual: false,
        },
      },
    }),
    [],
  );

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

  return (
    <ReactQuill
      ref={forwardRef}
      value={content}
      theme="snow"
      modules={qModule}
      onChange={handleChange}
      formats={quillFormats}
      placeholder="Write something awesome..."
      className="mt-4 h-[80%] w-full bg-white"
      onBlur={handleOnBlur}
    />
  );
};

export default QuillWrapper;
