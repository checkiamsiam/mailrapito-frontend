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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
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
  const quillRef = useRef(null);
  const t = useTranslations();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const id = params.get("id") as string;
  const [content, setContent] = useState<any>("");
  const editPostMutation = apiClient.posts.updatePost.useMutation();
  const router = useRouter();

  const { data, isLoading, refetch } = apiClient.posts.singlePost.useQuery({
    id,
  });

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
      title: "Publishing post...",
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
    try {
      await editPostMutation.mutateAsync({
        content,
        id,
        slug: values.slug,
        title: values.title,
        description: values.description,
        keywords: values.keywords,
        author: values.author,
        category: values.category,
        language: values.language,
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
