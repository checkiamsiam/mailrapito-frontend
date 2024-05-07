import { db } from "database";

export const fetchSinglePost = async (slug: string, a: boolean) => {
  const data = await db.blog.findUnique({
    where: {
      slug,
    },
  });

  if (data) {
    if (a) {
      await db.blog.update({
        where: {
          slug,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }
    return {
      success: true,
      singlePost: data,
    };
  } else {
    throw new Error("Post not found");
  }
};

export const fetchMostReadBlogs = async () => {
  const data = await db.blog.findMany({
    orderBy: {
      views: "desc",
    },
  });

  if (data) {
    return {
      success: true,
      mostReadBlogs: data,
    };
  } else {
    throw new Error("No blogs found");
  }
};

export const fetchMostLikedBlogs = async () => {
  const data = await db.blog.findMany({
    orderBy: {
      views: "asc",
    },
  });

  if (data) {
    return {
      success: true,
      mostLikedBlogs: data,
    };
  } else {
    throw new Error("No blogs found");
  }
};
