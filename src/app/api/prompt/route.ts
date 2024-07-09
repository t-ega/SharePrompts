import Post from "@models/post";
import { connectToDb } from "@utils/database";

export const GET = async (req: Request) => {
  try {
    await connectToDb();

    const url = new URL(req.url!);
    const searchParams = new URLSearchParams(url.searchParams);
    const query = searchParams.get("query");

    if (query) {
      const prompts = await Post.find({
        $or: [
          { prompt: { $regex: query, $options: "i" } },
          { tag: { $regex: query, $options: "i" } },
        ],
      })
        .populate("creator")
        .exec();

      return new Response(
        JSON.stringify({ message: "Success", data: prompts })
      );
    }

    const prompts = await Post.find().populate("creator").exec();
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
