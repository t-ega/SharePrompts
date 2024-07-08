import Post from "@models/post";
import { connectToDb } from "@utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export const GET = async (req: Request, { params }: any) => {
  const { id } = params;

  try {
    await connectToDb();
    const prompts = await Post.findOne({ id }).populate("creator").exec();
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

export const DELETE = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: any
) => {
  const { id } = params;
  console.log("kkkk");

  const session = await getServerSession();

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  try {
    await connectToDb();

    const post = await Post.findOneAndDelete({
      id,
      creator: session?.user?.id,
    }).exec();

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({}), {
      status: 204,
    });
  } catch (err) {
    console.error("An error occurred while fetching prompts", err);
    return new Response(
      JSON.stringify({ message: "An internal server error occured" }),
      { status: 500 }
    );
  }
};
