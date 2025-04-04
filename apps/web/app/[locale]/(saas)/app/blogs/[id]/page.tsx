"use client";

import { apiClient } from "@shared/lib/api-client";
import { Button } from "@ui/components/button";
import { Card } from "@ui/components/card";
import { toast } from "@ui/hooks/use-toast";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "./style.css";

export default function ClientComponent() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const deleteBlogMutation = apiClient.posts.deletePost.useMutation();

  const { data, isLoading, refetch } = apiClient.posts.singlePost.useQuery(
    {
      id,
    },
    {
      enabled: false,
    },
  );

  const deletePost = async (id: string) => {
    const deleteUserToast = toast({
      variant: "loading",
      title: "Deleting post...",
    });
    try {
      await deleteBlogMutation.mutateAsync({
        id: id,
      });
      deleteUserToast.update({
        id: deleteUserToast.id,
        variant: "success",
        title: "Post deleted",
        duration: 5000,
      });
      await refetch();
      router.push("/app/blogs/published-posts");
    } catch {
      deleteUserToast.update({
        id: deleteUserToast.id,
        variant: "error",
        title: "Post not deleted",
        duration: 5000,
      });
    }
  };

  function createMarkup() {
    const stringContent = data?.content;
    const parsedContent = JSON.parse(stringContent as string);
    if (stringContent) {
      const deltaOps = parsedContent?.ops as any[];
      const converter = new QuillDeltaToHtmlConverter(deltaOps);
      const html = converter.convert();
      return { __html: html };
    }
  }

  useEffect(() => {
    void refetch();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p- flex justify-end space-x-2 pb-2">
        <Button
          onClick={() => {
            router.push(`/app/blogs/edit-post?id=${id}`);
          }}
        >
          Edit
        </Button>
        <Button onClick={() => deletePost(id)}>Delete</Button>
      </div>
      <Card>
        {data?.thumbnail && (
          <div className="flex w-full items-center justify-center p-4">
            <Image
              src={data?.thumbnail}
              alt={data?.title}
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
        <div className="p-4 text-lg font-bold">{data?.title}</div>
        {data && (
          <div className="ql-editor" dangerouslySetInnerHTML={createMarkup()} />
        )}
      </Card>
    </>
  );
}
