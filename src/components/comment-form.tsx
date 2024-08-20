"use client";

import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createComment, updateComment } from "@/app/posts/[id]/actions";

type Props = {
  postId: string;
  userId: string;
  parentCommentId?: string | null;
  commentId?: string | null;
  content?: string;
  closeForm?: () => void;
};

const CommentForm = ({
  postId,
  userId,
  parentCommentId = null,
  commentId = null,
  content = "",
  closeForm,
}: Props) => {
  const ref = React.useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        const args = { postId, parentCommentId, userId, commentId };
        const response = commentId
          ? await updateComment({ ...args }, formData)
          : await createComment({ ...args }, formData);

        if (response) {
          ref.current?.reset();
          closeForm?.();
        }
      }}
      className="flex flex-1 flex-row items-stretch gap-2">
      <Textarea
        required
        name="content"
        placeholder="Add a comment..."
        defaultValue={content}
        className="rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Button type="submit" className="h-auto flex-1">
        {commentId ? "Edit" : "Reply"}
      </Button>
    </form>
  );
};

export default CommentForm;
