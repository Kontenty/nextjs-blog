import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { Inter } from "next/font/google";

import Post from "@/components/Post";
import { BlogPost } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps<{
  posts: BlogPost[];
}> = async () => {
  const res = await fetch("http://localhost:3000/api/get-posts");
  const posts = await res.json();
  return { props: { posts } };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ posts }: Props) {
  return (
    <main className={`flex min-h-screen p-12 ${inter.className}`}>
      <div className="max-w-5xl w-full mx-auto">
        <div className="grid grid-cols-3 gap-x-5 gap-y-6">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
