"use client";

import { MessageCircleIcon, ThumbsUpIcon, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import CommentForm from "./comment-form";
import { useState } from "react";
import { deleteComment } from "@/app/posts/[id]/actions";

type Props = {
  likes: number;
  postId: string;
  userId: string;
  commentId: string;
  isReplying?: boolean;
  setIsReplying?: (value: "edit" | "create" | null) => void;
  parentCommentId?: string | null;
  content?: string;
};

const Action = ({ likes, isReplying, setIsReplying, ...props }: Props) => {
  const deletAction = deleteComment.bind(null, props.commentId);

  return (
    <div className="flex items-start">
      <Button variant="ghost" size="sm" className="flex items-center gap-1">
        <ThumbsUpIcon className="h-4 w-4" />
        <span>{likes.toString()}</span>
        <span className="sr-only">Like</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={() => {}}>
        <MessageCircleIcon className="h-4 w-4" />
        <span className="sr-only">Reply</span>
      </Button>
      {props.content && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsReplying?.("edit");
          }}>
          Edit
        </Button>
      )}
      <form action={deletAction}>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </form>
      {isReplying && (
        <CommentForm
          postId={props.postId}
          userId={props.userId}
          parentCommentId={props.parentCommentId}
          closeForm={() => setIsReplying?.(null)}
        />
      )}
    </div>
  );
};

export default Action;
