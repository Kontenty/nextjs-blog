import { useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { Inter } from "next/font/google";

import Post from "@/components/Post";
import { BlogPost } from "@/types";
import { PAGE_SIZE } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps<{
  posts: BlogPost[];
  pages: number;
}> = async () => {
  try {
    const rawRes = await fetch("http://localhost:3000/api/get-posts");
    const { posts } = await rawRes.json();
    const pages = Math.ceil(posts.length / PAGE_SIZE);
    return { props: { posts, pages } };
  } catch (error) {
    return { props: { posts: [], pages: 1 } };
  }
};

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ posts, pages }: HomeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * PAGE_SIZE,
    (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <main className={`flex min-h-screen p-12 ${inter.className}`}>
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="mb-4 text-center text-3xl">From the blog</h1>
        <h3 className="mb-8 max-w-md mx-auto text-center text-slate-400 text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          dignissimos magnam rerum debitis iste voluptatem libero a.
        </h3>
        <div className="grid mb-6 grid-cols-3 gap-x-5 gap-y-6">
          {paginatedPosts.map((post) => (
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
          <span className="text-slate-600">Page: {currentPage}</span>
          <button
            className="px-6 py-2 bg-indigo-100 disabled:opacity-30"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= pages}
          >
            Next &gt;&gt;
          </button>
        </div>
      </div>
    </main>
  );
}
