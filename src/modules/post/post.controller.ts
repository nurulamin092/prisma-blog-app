import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/pagination-sorting-helpers";
import { UserRole } from "../../middleware/auth";

const createPost = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const result = await postService.createPost(req.body, user.id as string);
    res.status(201).json({
      success: true,
      message: "Post create successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;
    console.log({ isFeatured });

    const status = req.query.status as PostStatus | undefined;
    const authorId = req.query.authorId as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query
    );

    const result = await postService.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      throw new Error("Post id is required");
    }
    const result = await postService.getPostById(postId);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      throw new Error("You are not unauthorized");
    }
    const result = await postService.getMyPost(user?.id as string);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: "Post fetched failed",
      message: err.message,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { postId } = req.params;
    const isAdmin = user?.role === UserRole.ADMIN;
    const result = await postService.updatePost(
      postId as string,
      req.body,
      user?.id as string,
      isAdmin
    );

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Post fetched failed..",
      details: err,
    });
  }
};
export const postController = {
  createPost,
  getAllPost,
  getPostById,
  getMyPost,
  updatePost,
};
