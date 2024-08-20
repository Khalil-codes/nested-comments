import PostCard from "@/components/post-card";
import { fetchPostById } from "@/services/posts";
import React from "react";
import CommentForm from "@/components/comment-form";
import Comment from "@/components/comment";

type Props = {
  params: {
    id: string;
  };
};

const PostDetailPage = async ({ params }: Props) => {
  const post = await fetchPostById(params.id);
  return (
    <article>
      <PostCard post={post} />
      <div className="my-3">
        <CommentForm postId={post.id} userId={"cm00n2sfk0004g6bzp8etq5xf"} />
      </div>
      {/* Comments */}
      {post.comment.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Comments</h3>
          {post.comment.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      )}
    </article>
  );
};

export default PostDetailPage;
