"use client";

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
  // const saveToServer = async (file: File): Promise<string> => {
  //   const BaseURL = "http://api.mailrapido.com";
  //   const body = new FormData();
  //   body.append("image", file as Blob);

  //   try {
  //     const res = await axios.post(`${BaseURL}/api/v1/image/upload`, body);
  //     console.log("saveToServer", res);
  //     if (res.status === 200) {
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //       return res.data;
  //     } else {
  //       throw new Error(`Request failed with status code ${res.status}`);
  //     }
  //   } catch (err) {
  //     console.error("error", err.response?.data);
  //     throw err;
  //   }
  // };

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

  // const imageHandler = () => {
  //   const editor = quillRef?.current?.getEditor();

  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files?.[0];
  //     try {
  //       const link = await saveToServer(file as File);
  //       const range = editor?.getSelection(true);
  //       if (range) {
  //         editor?.insertEmbed(range.index, "image", link);
  //       } else {
  //         editor?.clipboard.dangerouslyPasteHTML(
  //           editor?.getLength(),
  //           `<img src="${link}" alt=""/>`,
  //         );
  //       }
  //     } catch (err) {
  //       console.log("upload err:", err.response?.data);
  //     }
  //   };
  // };

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
        // handlers: {
        //   image: handleUploadImage,
        // },
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
      className="mt-4 h-[90%] w-full bg-white"
      onBlur={handleOnBlur}
    />
  );
};

export default QuillWrapper;
