-- CreateTable
CREATE TABLE "nested-comments_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nested-comments_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nested-comments_post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "nested-comments_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nested-comments_comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "nested-comments_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nested-comments_like" (
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nested-comments_like_pkey" PRIMARY KEY ("userId","commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "nested-comments_comment_postId_userId_key" ON "nested-comments_comment"("postId", "userId");

-- AddForeignKey
ALTER TABLE "nested-comments_post" ADD CONSTRAINT "nested-comments_post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "nested-comments_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nested-comments_comment" ADD CONSTRAINT "nested-comments_comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "nested-comments_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nested-comments_comment" ADD CONSTRAINT "nested-comments_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "nested-comments_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nested-comments_comment" ADD CONSTRAINT "nested-comments_comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "nested-comments_comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nested-comments_like" ADD CONSTRAINT "nested-comments_like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "nested-comments_comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nested-comments_like" ADD CONSTRAINT "nested-comments_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "nested-comments_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
