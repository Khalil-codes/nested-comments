import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Prisma } from "@prisma/client";
import { formatRelative } from "date-fns";
import Link from "next/link";
import { getInitials } from "@/lib/utils";

type Props = {
  post: Prisma.PostGetPayload<{
    select: {
      id: true;
      title: true;
      content: true;
      user: { select: { name: true } };
      createdAt: true;
    };
  }>;
};

const PostCard = ({ post }: Props) => {
  return (
    <Card className="h-full group-hover:border-primary">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="flex h-10 w-10 items-center justify-center rounded-full border bg-secondary">
          <AvatarFallback className="font-bold tracking-wide">
            {getInitials(post.user.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{post.user.name}</div>
          <div className="text-sm text-muted-foreground">
            {formatRelative(new Date(post.createdAt), new Date())}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold group-hover:underline">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-4 text-muted-foreground">
          {post.content}
        </p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
