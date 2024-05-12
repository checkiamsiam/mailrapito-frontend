"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import QuillWrapper from "@marketing/home/components/QuillWrapper";
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
import { Icon } from "@ui/components/icon";
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
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { v4 as uuid } from "uuid";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  author: z.string().min(1, { message: "Required" }),
  slug: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  keywords: z.string().min(1, { message: "Required" }),
  category: z.string().min(1, { message: "Required" }),
  language: z.enum(["", "en", "fr", "es", "ar"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditBlog() {
  const router = useRouter();
  const quillRef = useRef(null);
  const t = useTranslations();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const id = params.get("id") as string;
  const [content, setContent] = useState<any>("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const { data, isLoading, refetch } = apiClient.posts.singlePost.useQuery({
    id,
  });

  const editPostMutation = apiClient.posts.updatePost.useMutation();
  const uploadUrlMutation = apiClient.uploads.signedUploadUrl.useMutation();
  const getURLMutation = apiClient.uploads.getSignedUploadedUrl.useMutation();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false,
  });

  const uploadThumbnail = async () => {
    setUploading(true);

    toast({
      variant: "loading",
      title: "Uploading thumbnail...",
    });

    const path = uuid();

    try {
      const uploadUrl = await uploadUrlMutation.mutateAsync({
        path,
        bucket: "avatars",
      });

      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: image,
        headers: {
          "Content-Type": "image/png",
        },
      });

      if (!response.ok) {
        setUploading(false);
        toast({
          variant: "error",
          title: "Failed to upload thumbnail",
        });
        throw new Error("Failed to upload thumbnail");
      }

      toast({
        variant: "loading",
        title: "Fetching image url",
      });

      const cloudUrl = await getURLMutation.mutateAsync({
        path,
        bucket: "avatars",
      });

      if (cloudUrl) {
        setUploadedUrl(cloudUrl);
        toast({
          variant: "success",
          title: "Image uploaded",
        });
        setUploading(false);
      } else {
        setUploading(false);
        toast({
          variant: "error",
          title: "Failed to upload thumbnail",
        });
        throw new Error("Failed to upload thumbnail");
      }
      return cloudUrl;
    } catch (err) {
      setUploading(false);
      toast({
        variant: "error",
        title: "Failed to upload thumbnail",
      });
      throw err;
    }
  };

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

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
      language: "",
      description: "",
    },
  });

  const { data: categories, isLoading: catLoading } =
    apiClient.posts.getCategories.useQuery({
      enabled: data?.category,
    });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const updatingPost = toast({
      variant: "loading",
      title: "Updating post...",
    });
    if (values.category === "") {
      updatingPost.update({
        id: updatingPost.id,
        variant: "error",
        title: "Please select a category",
        duration: 5000,
      });
      return;
    }

    if (!content) {
      updatingPost.update({
        id: updatingPost.id,
        variant: "error",
        title: "Content is required",
        duration: 5000,
      });
      return;
    }

    if (!uploadedUrl) {
      updatingPost.update({
        id: updatingPost.id,
        variant: "error",
        title: "Thumbnail is required",
        duration: 5000,
      });
      return;
    }

    try {
      await editPostMutation.mutateAsync({
        content,
        thumbnail: uploadedUrl ?? data?.thumbnail,
        id,
        slug: values.slug,
        title: values.title,
        description: values.description,
        keywords: values.keywords,
        author: values.author,
        category: values.category,
        language: values.language,
      });
      updatingPost.update({
        id: updatingPost.id,
        variant: "success",
        title: "Post updated",
        duration: 5000,
      });
      await refetch();
      form.reset();
      setContent("");
      router.refresh();
      router.push("/app/blogs/published-posts");

      console.log("success");
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (image) {
      void uploadThumbnail();
    }
  }, [image]);

  useEffect(() => {
    if (!isLoading && data) {
      form.setValue("title", data?.title);
      form.setValue("slug", data?.slug);
      form.setValue("author", data?.author);
      form.setValue("keywords", data?.keywords);
      if (data?.category) {
        form.setValue("category", data?.category);
      }
      if (typeof data?.language === "string") {
        type Language = "" | "en" | "fr" | "es" | "ar";
        const a: Language = data?.language as Language;
        form.setValue("language", a ?? "");
      }
      form.setValue("description", data?.description);
      if (data?.content) {
        setContent(data?.content);
      }
      if (data?.thumbnail) {
        setUploadedUrl(data?.thumbnail);
      }
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (catLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
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
              {categories && (
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
                            defaultValue={data?.category ?? ""}
                          >
                            <SelectTrigger className="">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((option) => (
                                <SelectItem
                                  key={option.name}
                                  value={option.name}
                                >
                                  {option.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
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
                          defaultValue={data?.language ?? ""}
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
                  <QuillWrapper
                    forwardRef={quillRef}
                    content={content}
                    handleEditorChange={handleEditorChange}
                  />
                </div>
              </div>
              <div className="mt-4">Thumbnail</div>
              <div className="rounded-sm border-2 border-gray-100 p-10">
                <div className="relative rounded-full" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="relative">
                    <button
                      type="button"
                      title="Click to upload"
                      className="group flex w-full cursor-pointer items-center justify-center gap-4 px-6 py-4 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:border-gray-400/60 before:bg-gray-100 before:transition-transform before:duration-300 hover:before:scale-105 hover:before:border-gray-300 active:duration-75 active:before:scale-95"
                    >
                      <div className="flex items-center">
                        <div className="relative w-max">
                          <Icon.upload className="text-blue-900 group-hover:text-blue-500" />
                        </div>
                        <div className="relative ml-4 flex w-full flex-col items-center justify-center">
                          <span className="relative block text-base font-semibold text-blue-900 group-hover:text-blue-500">
                            Upload a image
                          </span>
                        </div>
                      </div>
                    </button>
                    <input
                      className="hidden"
                      type="file"
                      name="button2"
                      id="button2"
                    />
                  </div>

                  {uploading && (
                    <div className="bg-card/90 absolute inset-0 z-20 flex items-center justify-center">
                      <Icon.spinner className="text-primary h-6 w-6 animate-spin" />
                    </div>
                  )}
                </div>
              </div>
              {uploadedUrl && (
                <div className="inset-0 z-10 mt-4">
                  <Image
                    src={uploadedUrl}
                    alt="Thumbnail"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    width={500}
                    height={300}
                  />
                </div>
              )}
            </div>

            <div className="mt-10 flex justify-end pt-3">
              <Button type="submit" loading={form.formState.isSubmitting}>
                Update Post
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
