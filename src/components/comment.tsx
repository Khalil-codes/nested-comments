"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Prisma } from "@prisma/client";
import { getInitials } from "@/lib/utils";
import { formatRelative } from "date-fns";
import Action from "./comment-action";
import { useState } from "react";
import CommentForm from "./comment-form";

type Comment = Prisma.CommentGetPayload<{
  include: {
    _count: { select: { likes: true } };
    user: { select: { name: true } };
  };
}> & { children?: Comment[] };

const Comment = ({ comment }: { comment: Comment }) => {
  const [toggleForm, setToggleForm] = useState<"create" | "edit" | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <Avatar className="flex h-10 w-10 items-center justify-center rounded-full border bg-secondary">
          <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">{comment.user.name}</div>
            <div className="text-xs text-muted-foreground">
              {formatRelative(new Date(comment.createdAt), new Date())}
            </div>
          </div>
          {toggleForm === "edit" ? (
            <CommentForm
              postId={comment.postId}
              userId={comment.userId}
              closeForm={() => setToggleForm(null)}
              commentId={comment.id}
              content={comment.content}
            />
          ) : (
            <p>{comment.content}</p>
          )}
          <Action
            likes={comment._count.likes}
            commentId={comment.id}
            parentCommentId={comment.id}
            postId={comment.postId}
            userId={comment.userId}
            content={comment.content}
            isReplying={toggleForm === "create"}
            setIsReplying={(val) => setToggleForm(val)}
          />
          {comment.children && (
            <div className="border-l pl-4">
              {comment.children.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
