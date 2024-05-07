"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@shared/lib/api-client";
import { Button } from "@ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/select";
import { Textarea } from "@ui/components/textarea";
import { toast } from "@ui/hooks/use-toast";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import type ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }, { font: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "video"],
  [{ align: [] }],
  [{ color: [] }],
  ["code-block"],
  ["clean"],
];

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

const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  author: z.string().min(1, { message: "Required" }),
  slug: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  keywords: z.string().min(1, { message: "Required" }),
  category: z.enum(["", "MEMBER", "OWNER"]),
  language: z.enum(["en", "fr", "es", "ar"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function PublishBlog() {
  const quillRef = useRef<ReactQuill>(null);
  const router = useRouter();
  const t = useTranslations();
  const [content, setContent] = useState<string>("");
  const createPostMutation = apiClient.posts.createPost.useMutation();

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const categoryOptions = [
    {
      label: t("settings.team.members.roles.member"),
      value: "MEMBER",
    },
    {
      label: t("settings.team.members.roles.owner"),
      value: "OWNER",
    },
  ];

  const languageOptions = [
    {
      label: "English",
      value: "en",
    },
    {
      label: "French",
      value: "fr",
    },
    {
      label: "Spanish",
      value: "es",
    },
    {
      label: "Arabic",
      value: "ar",
    },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "",
      keywords: "",
      category: "",
      language: "en",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log("onSubmit: SubmitHandler called");
    const validationToast = toast({
      variant: "loading",
      title: "Publishing post...",
    });

    if (values.category === "") {
      validationToast.update({
        id: validationToast.id,
        variant: "error",
        title: "Please select a category",
        duration: 5000,
      });
      return;
    }

    if (!content) {
      validationToast.update({
        id: validationToast.id,
        variant: "error",
        title: "Content is required",
        duration: 5000,
      });
      return;
    }

    if (content.length < 100) {
      validationToast.update({
        id: validationToast.id,
        variant: "error",
        title: "Content must be at least 100 characters long",
        duration: 5000,
      });
      return;
    }
    try {
      await createPostMutation.mutateAsync({
        ...values,
        content,
      });
      form.reset();
      setContent("");
      router.push("/app/blogs/published-posts");
    } catch (e) {
      console.log(e);
    }
  };

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

  const handleOnBlur = () => {
    handleEditorChange(content);
  };

  const modules = {
    toolbar: {
      container: toolbarOptions,
      // handlers: {
      //   image: imageHandler,
      // },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="@container">
            <div className="">
              <div className="">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <Controller
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          type="slug"
                          {...field}
                          placeholder="type-title-in-this-format-to-make-it-slug"
                          onBlur={(e) => {
                            const alteredSlug = e.target.value
                              .replace(/\s+/g, "-")
                              .toLowerCase();
                            field.onChange(alteredSlug);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input type="author" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Input type="keywords" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {languageOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-[500px]">
                <FormLabel>Content</FormLabel>
                <div className="h-full w-full">
                  <QuillEditor
                    ref={quillRef}
                    value={content}
                    onChange={handleEditorChange}
                    modules={modules}
                    formats={quillFormats}
                    onBlur={handleOnBlur}
                    className="mt-4 h-[90%] w-full bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end border-t pt-3">
              <Button type="submit" loading={form.formState.isSubmitting}>
                Publish Post
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
