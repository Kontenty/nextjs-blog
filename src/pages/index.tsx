import { useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import useSWR from "swr";
import cs from "classNames";

import Post from "@/components/Post";
import { BlogPost, Category } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps<{
  posts: BlogPost[];
  pages: number;
  categories: Category[];
}> = async () => {
  try {
    const sourceFetch = ["get-posts", "get-categories"].map((name) =>
      fetch(`http://localhost:3000/api/${name}`).then((res) => res.json())
    );
    const response = await Promise.all(sourceFetch);
    const posts = response[0].posts;
    const pages = response[0].pages;
    const categories = response[1].categories;
    return { props: { categories, posts, pages } };
  } catch (error) {
    return { props: { categories: [], posts: [], pages: 1 } };
  }
};

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ categories, posts, pages }: HomeProps) {
  const router = useRouter();
  const { cat: categoryQuery, page } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSWR<{ posts: BlogPost[]; pages: number }>(
    categoryQuery
      ? `/api/get-posts?p=${currentPage}&cat=${categoryQuery}`
      : `/api/get-posts?p=${currentPage}`
  );

  return (
    <main className={`flex min-h-screen p-12 ${inter.className}`}>
      <div className="mx-auto max-w-[1300px]">
        <h1 className="mb-4 text-center text-3xl">From the blog</h1>
        <h3 className="mb-8 max-w-md mx-auto text-center text-slate-400 text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          dignissimos magnam rerum debitis iste voluptatem libero a.
        </h3>
        <div className="flex gap-4">
          <aside className="flex flex-col gap-2 w-48">
            <h3 className="text-lg">Filters</h3>
            <p className="text-slate-600">Categories</p>
            {categories.map((category) => (
              <Link key={category.id} href={`/?cat=${category.slug}`}>
                <button
                  className={cs(
                    "px-6 py-2 bg-indigo-100 border-b-2 disabled:opacity-30",
                    {
                      "border-red-600": category.slug === categoryQuery,
                    }
                  )}
                >
                  {category.name}
                </button>
              </Link>
            ))}
            <p className="text-slate-600 mt-2">Title</p>
            <input name="title" className="border p-2 mb-2" />
            <Link href="/">
              <button className="px-6 py-2 text-sm bg-slate-200 border-b-2 disabled:opacity-30">
                Clear filters x
              </button>
            </Link>
          </aside>

          <div className="max-w-5xl w-ful">
            <div className="grid mb-6 grid-cols-3 gap-x-5 gap-y-6">
              {(data?.posts || posts).map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-3">
              <button
                className="px-6 py-2 bg-indigo-100 disabled:opacity-30"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                &lt;&lt; Prev
              </button>
              <span className="text-slate-600">
                Page: {currentPage} of {data?.pages ?? pages}{" "}
              </span>
              <button
                className="px-6 py-2 bg-indigo-100 disabled:opacity-30"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= (data?.pages ?? pages)}
              >
                Next &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
