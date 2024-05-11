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
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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
  language: z.enum(["en", "fr", "es", "ar"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function PublishBlog() {
  const quillRef = useRef(null);
  const router = useRouter();
  const t = useTranslations();
  const [content, setContent] = useState<string>("");
  const createPostMutation = apiClient.posts.createPost.useMutation();

  const handleEditorChange = (newContent: string) => {
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
      language: "en",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const validationToast = toast({
      variant: "loading",
      title: "Publishing post...",
    });

    console.log(values);

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

  const {
    data: categories,
    isLoading,
    refetch,
  } = apiClient.posts.getCategories.useQuery({
    enabled: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                        <Input
                          type="title"
                          {...field}
                          placeholder="Enter title"
                        />
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
                        <Input
                          type="author"
                          {...field}
                          placeholder="Enter author name"
                        />
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
                        <Input
                          type="keywords"
                          {...field}
                          placeholder="Enter keywords following with space"
                        />
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
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="">
                              <SelectValue
                                placeholder="Select a category"
                                className="text-gray-200"
                              />
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
                        <Textarea {...field} placeholder="Enter description" />
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
