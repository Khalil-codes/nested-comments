"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

type Metadata = {
  postId: string;
  parentCommentId: string | null;
  userId: string;
  commentId?: string | null;
};
export const createComment = async (meta: Metadata, formData: FormData) => {
  const content = formData.get("content") as string;
  const { postId, userId, parentCommentId } = meta;
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      userId,
      parentId: parentCommentId,
    },
  });

  revalidatePath(`/posts/${postId}`);
  return comment;
};

export const updateComment = async (meta: Metadata, formData: FormData) => {
  const content = formData.get("content") as string;
  const { postId, userId, commentId, parentCommentId } = meta;
  if (!commentId) throw new Error("commentId is required");
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: {
      content,
      postId,
      userId,
      parentId: parentCommentId,
    },
  });

  revalidatePath(`/posts/${postId}`);
  return comment;
};

export const deleteComment = async (commentId: string) => {
  const comment = await prisma.comment.delete({ where: { id: commentId } });
  revalidatePath(`/posts/${comment.postId}`);
  return comment;
};
