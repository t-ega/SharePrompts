import Post from "@models/post";
import { connectToDb } from "@utils/database";
import { validatePost } from "@utils/validators/post.validator";

export const POST = async (req: Request) => {
  const data = await req.json();

  const { error, value } = validatePost(data);

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Validation failed",
        error: error.details[0].message,
      }),
      {
        status: 400,
      }
    );
  }

  try {
    await connectToDb();

    const createdPrompt = await Post.create({
      ...value,
    });

    return new Response(
      JSON.stringify({ message: "Success", data: createdPrompt }),
      { status: 201 }
    );
  } catch (err) {
    console.error("An error occurred while saving prompt", err);
    return new Response(
      JSON.stringify({ message: "An internal server error occured" }),
      { status: 500 }
    );
  }
};
