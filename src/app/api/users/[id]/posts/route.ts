import Post from "@models/post";
import { connectToDb } from "@utils/database";

export const GET = async (req: Request, { params }: any) => {
  const id = params.id;

  try {
    await connectToDb();
    const prompts = await Post.find({ creator: id }).populate("creator").exec();
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
