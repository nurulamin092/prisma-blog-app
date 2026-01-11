import { Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();
router.get("/", postController.getAllPost);
router.get(
  "/my-posts",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.getMyPost
);

router.get("/stats", postController.getStats);

router.get("/:postId", postController.getPostById);

router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.createPost
);
router.patch(
  "/:postId",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.updatePost
);

router.delete(
  "/:postId",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.deletePost
);

export const postRouter: Router = router;
