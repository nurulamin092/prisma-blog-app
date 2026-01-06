import { Request, Response } from "express";
import { commentService } from "./comment.service";
import { date } from "better-auth/*";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await commentService.createComment(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Comment create failed",
      details: err,
    });
  }
};

const getCommentById = async (req: Request, res: Response) => {
  const { commentId } = req.params;

  try {
    const result = await commentService.getCommentById(commentId as string);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Comment fetched failed",
      details: err,
    });
  }
};

const getCommentByAuthor = async (req: Request, res: Response) => {
  const { authorId } = req.params;
  try {
    const result = await commentService.getCommentByAuthor(authorId as string);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Author fetched failed",
      details: err,
    });
  }
};

const deleteComments = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { commentId } = req.params;
    const result = await commentService.deleteComments(
      commentId as string,
      user?.id as string
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "delete comment failed",
      details: err,
    });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { commentId } = req.params;

    const result = await commentService.updateComment(
      commentId as string,
      req.body,
      user?.id as string
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "updated comment failed",
      details: err,
    });
  }
};

export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthor,
  deleteComments,
  updateComment,
};
