import Joi from "joi";

const PostSchema = Joi.object({
  post: Joi.string().required(),
  tag: Joi.string().required(),
  userId: Joi.string().required(),
});

const validatePost = (post: any) => {
  console.log("The post", post);
  return PostSchema.validate(post);
};

export { validatePost };
