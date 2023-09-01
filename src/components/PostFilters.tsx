import React, { useState } from "react";
import Link from "next/link";
import cs from "classnames";
import { useRouter } from "next/router";

import { Category } from "@/types";

type Props = {
  categories: Category[];
};

const PostFilters = ({ categories }: Props) => {
  const router = useRouter();
  const { cat: categoryQuery } = router.query;
  const [searchString, setSearchString] = useState("");

  const handleClear = () => {
    setSearchString("");
    router.push("/");
  };

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
      <input
        name="title"
        className="border p-2"
        onChange={(event) => setSearchString(event.target.value)}
        value={searchString}
      />
      <Link href={`/?title=${searchString}`}>
        <button
          className="px-6 py-2 text-sm bg-indigo-200 border-b-2 disabled:opacity-30"
          disabled={!searchString}
        >
          Search
        </button>
      </Link>
      <button
        className="px-6 py-2 mt-2 text-sm bg-slate-200 border-b-2 disabled:opacity-30"
        onClick={handleClear}
      >
        Clear filters x
      </button>
    </>
  );
};

export default PostFilters;
