"use client";

import { apiClient } from "@shared/lib/api-client";
import { Button } from "@ui/components/button";
import { Card } from "@ui/components/card";
import { toast } from "@ui/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function createMarkup() {
    return { __html: typeof data?.content === "string" && data?.content };
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
        <div className="p-4">{data?.title}</div>
        {data && (
          <div className="p-4" dangerouslySetInnerHTML={createMarkup()} />
        )}
      </Card>
    </>
  );
}
