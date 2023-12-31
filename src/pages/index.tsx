import { useEffect, useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { clsx } from "clsx";

import { BlogPost, Category } from "@/types";
import PostFilters from "@/components/PostFilters";
import PostsList from "@/components/PostsList";
import Pagination from "@/components/Pagination";

const apiUrl = "/api/posts";

export const getStaticProps: GetStaticProps<{
  posts: BlogPost[];
  pages: number;
  categories: Category[];
}> = async () => {
  try {
    const sourceFetch = ["posts", "categories"].map((name) =>
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
  const { cat: categoryQuery, title: titleQuery } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSWR<{ posts: BlogPost[]; pages: number }>(
    clsx(`${apiUrl}?p=${currentPage}`, {
      [`&cat=${categoryQuery}`]: categoryQuery,
      [`&title=${titleQuery}`]: titleQuery,
    }).replaceAll(" ", "")
  );

  useEffect(() => {
    if (categoryQuery || titleQuery) {
      setCurrentPage(1);
    }
  }, [categoryQuery, titleQuery]);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <h1 className="mb-4 text-center text-3xl">From the blog</h1>
      <h3 className="mb-8 max-w-md mx-auto text-center text-slate-400 text-lg">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
        dignissimos magnam rerum debitis iste voluptatem libero a.
      </h3>
      <div className="flex gap-4">
        <aside className="flex flex-col gap-2 w-48">
          <PostFilters categories={categories} />
        </aside>
        <div className="w-full">
          <PostsList posts={data?.posts ?? posts} />
          <Pagination
            current={currentPage}
            pages={data?.pages ?? pages}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      </div>
    </>
  );
}
