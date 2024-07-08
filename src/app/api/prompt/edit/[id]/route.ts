import Post from "@models/post";
import { connectToDb } from "@utils/database";
import { validatePost } from "@utils/validators/post.validator";

export const PUT = async (req: Request, { params }: any) => {
  const id = params.id;
  const body = await req.json();
  const { error, value } = validatePost(body);

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }

  try {
    await connectToDb();
    const post = await Post.find({ id, creator: value.userId }, value, {
      new: true,
    })
      .populate("creator")
      .exec();
    return new Response(JSON.stringify({ message: "Success", data: post }), {
      status: 200,
    });
  } catch (err) {
    console.error("An error occurred while fetching prompts", err);
    return new Response(
      JSON.stringify({ message: "An internal server error occured" }),
      { status: 500 }
    );
  }
};
