export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface FetchBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
}

export interface BlogPost extends Omit<FetchBlogPost, "categories"> {
  categories: (Category | undefined)[];
}

export interface BlogData {
  posts: BlogPost[];
  categories: Category[];
}

export interface FetchBlogData {
  posts: FetchBlogPost[];
  categories: Category[];
}
