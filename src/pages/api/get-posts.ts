import path from "node:path";
import { readFile } from "node:fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { BlogData, BlogPost, FetchBlogData } from "@/types";

type ResponseData = BlogPost[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const dbFolder = path.join(process.cwd(), "db");
  const fileContents = await readFile(dbFolder + "/blog.json", "utf8");
  const blogData: FetchBlogData = JSON.parse(fileContents.toString());
  const posts: BlogPost[] = blogData.posts.map((post) => {
    return {
      ...post,
      categories: post.categories.map((postCategory) =>
        blogData.categories.find((cat) => cat.id === postCategory)
      ),
    };
  });
  return res.status(200).json(posts);
}
