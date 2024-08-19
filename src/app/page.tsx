import PostCard from "@/components/post-card";
import { fetchPosts } from "@/services/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <main className="flex flex-col gap-4">
      <h1 className="my-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Posts
      </h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="group">
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </main>
  );
}
