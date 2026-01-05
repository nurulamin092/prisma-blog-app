import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  const postData = await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  if (payload.parentId) {
    const parentId = await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }
  const result = await prisma.comment.create({ data: payload });
  return result;
  console.log("create comment service!", payload);
};

export const commentService = {
  createComment,
};
