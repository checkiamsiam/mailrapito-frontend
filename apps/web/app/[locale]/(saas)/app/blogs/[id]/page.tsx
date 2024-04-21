"use client";
import { apiClient } from "@shared/lib/api-client";
import { Card } from "@ui/components/card";
import { useParams } from "next/navigation";

export default function ClientComponent({ updateItem }) {
  const params = useParams();
  const id = params.id;
  console.log("🚀 ~ ClientComponent ~ id:", id);

  const { data, isLoading } = apiClient.posts.singlePost.useQuery({
    id,
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function createMarkup() {
    return { __html: data.content };
  }

  return (
    <Card>
      <div className="p-4" dangerouslySetInnerHTML={createMarkup()} />
    </Card>
  );
}
