import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  post: {
    type: String,
    required: [true, "The prompt for the AI??"],
    min: [5, "Prompt is too small"],
  },

  tag: {
    type: String,
    required: [true, "The tag(s) the prompt falls under"],
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
