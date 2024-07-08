import Post from "@models/post";
import User from "@models/user";
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

export const DELETE = async (req: NextApiRequest, { params }: any) => {
  const { id } = params;

  const session = await getServerSession();

  if (!session) {
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }

  try {
    await connectToDb();

    const user = await User.findOne({ email: session?.user?.email }).exec();
    const post = await Post.findOneAndDelete({
      id,
      creator: user?.id,
    }).exec();

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ mesage: "Success" }), {
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
