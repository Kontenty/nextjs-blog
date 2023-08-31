import Link from "next/link";
import React from "react";
import cs from "classNames";
import { useRouter } from "next/router";

import { Category } from "@/types";

type Props = {
  categories: Category[];
};

const PostFilters = ({ categories }: Props) => {
  const router = useRouter();
  const { cat: categoryQuery } = router.query;

  return (
    <>
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
    </>
  );
};

export default PostFilters;
