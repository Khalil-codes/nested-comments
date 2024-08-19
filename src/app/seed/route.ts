import prisma from "@/lib/db";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const GET = async () => {
  try {
    const users = await createUsers();
    const posts = await createPosts({ users });
    const { comments, nestedComments } = await createComments({ posts, users });
    return Response.json(
      { users, posts, nestedComments, comments },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
};

const createUsers = async () => {
  await prisma.user.deleteMany();

  const _users = [1, 2, 3].map(() => ({
    name: faker.person.fullName(),
  }));

  const users = await prisma.user.createManyAndReturn({
    data: _users,
  });

  return users;
};

const createPosts = async ({
  users,
}: {
  users: Prisma.UserGetPayload<null>[];
}) => {
  await prisma.post.deleteMany();
  const posts = await prisma.post.createManyAndReturn({
    data: [1, 2, 3].map(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(6),
      userId: users[Math.floor(Math.random() * users.length)].id,
    })),
  });

  return posts;
};

const createComments = async ({
  posts,
  users,
}: {
  posts: Prisma.PostGetPayload<null>[];
  users: Prisma.UserGetPayload<null>[];
}) => {
  await prisma.comment.deleteMany();
  const comments = await prisma.comment.createManyAndReturn({
    data: [1, 2, 3].map(() => ({
      content: faker.lorem.sentence(),
      postId: posts[Math.floor(Math.random() * posts.length)].id,
      userId: users[Math.floor(Math.random() * users.length)].id,
    })),
  });
  const nestedComments = await prisma.comment.createManyAndReturn({
    data: [1].map(() => ({
      content: faker.lorem.sentence(),
      postId: posts[0].id,
      userId: users[1].id,
      parentId: comments[0].id,
    })),
  });

  return { comments, nestedComments };
};
