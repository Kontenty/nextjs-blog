import React, { useState } from "react";
import Image from "next/image";

import { BlogPost } from "@/types";
import placeholder from "@/assets/placeholder-image.jpg";

import styles from "./Post.module.css";

type Props = {
  post: BlogPost;
};

const Post = ({ post }: Props) => {
  const [isImgError, setIsImgError] = useState(false);

  return (
    <div className={styles.card}>
      <div className="relative w-full aspect-[2/1]">
        <Image
          src={isImgError ? placeholder : post.imageUrl}
          fill
          alt="post image"
          className="object-cover object-center"
          sizes="100%"
          onError={() => setIsImgError(true)}
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.category}>
          {post.categories.map((category) => (
            <span key={category?.id}>{category?.name}</span>
          ))}
        </div>
        <h3 className="text-xl">{post.title}</h3>
        <p className="text-slate-500">{post.excerpt}</p>
      </div>
    </div>
  );
};

export default Post;
