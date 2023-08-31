import path from "node:path";
import { readFile } from "node:fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { BlogPost, FetchBlogData } from "@/types";
import { PAGE_SIZE } from "@/constants";

type ResponseData = { posts: BlogPost[]; pages: number };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const dbFolder = path.join(process.cwd(), "db");
  const fileContents = await readFile(dbFolder + "/blog.json", "utf8");
  const blogData: FetchBlogData = JSON.parse(fileContents.toString());
  const posts: BlogPost[] = blogData.posts.map((post) => ({
    ...post,
    categories: post.categories.map((postCategory) =>
      blogData.categories.find((category) => category.id === postCategory)
    ),
  }));
  const currentPage = req.query.p ? Number(req.query.p) : 1;
  const paginatedPosts = posts.slice(
    (currentPage - 1) * PAGE_SIZE,
    (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
  );
  const pages = Math.ceil(posts.length / PAGE_SIZE);

  return res.status(200).json({ posts: paginatedPosts, pages });
}
