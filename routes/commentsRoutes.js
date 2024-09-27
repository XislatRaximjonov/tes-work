import express from "express";
import * as commentsControllers from "../Controllers/CommentsControlles.js";

export const commentsRouter = express.Router();

commentsRouter
  .route("/")
  .get(commentsControllers.getAllComments)
  .post(commentsControllers.createComment);

  commentsRouter
  .route("/:id")
  .get(commentsControllers.getComment)
  .patch(commentsControllers.updateComment)
  .delete(commentsControllers.deleteComment);