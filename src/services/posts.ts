import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const fetchPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      user: { select: { name: true } },
      createdAt: true,
    },
  });
  return posts;
};

export const fetchPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      content: true,
      title: true,
      comment: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          _count: { select: { likes: true } },
          likes: { select: { user: { select: { name: true } } } },
          user: { select: { name: true } },
        },
      },
      user: { select: { name: true } },
      createdAt: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const comments = getNestedComments(post.comment);

  return { ...post, comment: comments };
};

const getNestedComments = <
  T extends Prisma.CommentGetPayload<{
    include: {
      _count: { select: { likes: true } };
      user: { select: { name: true } };
    };
  }>,
>(
  comments: T[]
) => {
  if (!comments) return [];

  console.log(JSON.stringify(comments), null, 2);

  const commentsWithParentId = comments.filter((comment) => comment.parentId);
  const _comments: Array<T & { children?: T[] }> = comments;

  const comment = _comments.map((comment) => {
    commentsWithParentId.forEach((nestedComment) => {
      if (comment.id === nestedComment.parentId) {
        comment.children ||= [];
        comment.children.push(nestedComment);
      }
    });

    return comment;
  });

  return comment.filter((comment) => !comment.parentId);
};

export const getCommentsByPostId = async (postId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    select: {
      id: true,
      content: true,
      user: { select: { name: true } },
      createdAt: true,
    },
  });
  return comments;
};
