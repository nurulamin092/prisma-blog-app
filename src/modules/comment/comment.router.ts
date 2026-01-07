import { Router } from "express";
import { commentController } from "./comment.controller";
import auth, { UserRole } from "../../middleware/auth";
import { commentService } from "./comment.service";

const router = Router();
router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.createComment
);

router.get("/author/:authorId", commentController.getCommentByAuthor);
router.get("/:commentId", commentController.getCommentById);
router.patch(
  "/:commentId",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.updateComment
);

router.patch(
  "/:commentId/moderate",
  auth(UserRole.ADMIN),
  commentController.moderateComment
);
router.delete(
  "/:commentId",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.deleteComments
);
export const commentRouter: Router = router;
