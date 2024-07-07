import Post from "@models/post";
import { connectToDb } from "@utils/database";

export const GET = async (req: Request) => {
  try {
    await connectToDb();
    const prompts = await Post.find();
    return new Response(JSON.stringify({ message: "Success", data: prompts }), {
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