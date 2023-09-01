import path from "node:path";
import { readFile } from "node:fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { Category, FetchBlogData } from "@/types";

type ResponseData = { categories: Category[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const dbFolder = path.join(process.cwd(), "db");
  const fileContents = await readFile(dbFolder + "/blog.json", "utf8");
  const blogData: FetchBlogData = JSON.parse(fileContents.toString());
  return res.status(200).json({ categories: blogData.categories });
}
