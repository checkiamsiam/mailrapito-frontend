"use client";
import { apiClient } from "@shared/lib/api-client";
import { Button } from "@ui/components/button";
import { Card } from "@ui/components/card";
import { useParams, useRouter } from "next/navigation";

export default function ClientComponent() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data, isLoading } = apiClient.posts.singlePost.useQuery({
    id,
  });

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
        <Button>Delete</Button>
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
