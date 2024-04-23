"use client";
import { apiClient } from "@shared/lib/api-client";
import { Card } from "@ui/components/card";
import { useParams } from "next/navigation";

export default function ClientComponent() {
  const params = useParams();
  const id = params.id as string;

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
    <Card>
      {data && <div className="p-4" dangerouslySetInnerHTML={createMarkup()} />}
    </Card>
  );
}
