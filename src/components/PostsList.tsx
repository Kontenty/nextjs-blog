import React from "react";

import { BlogPost } from "@/types";
import Post from "./Post";

type Props = { posts: BlogPost[] };

const PostsList = ({ posts }: Props) => {
  return (
    <div className="grid mb-6 grid-cols-3 gap-x-5 gap-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
