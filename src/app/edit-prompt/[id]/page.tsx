"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface IEditPromptProps {
  params: {
    id: string;
  };
}
const EditPrompt = ({ params }: IEditPromptProps) => {
  const { id } = params;
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const handleEdit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
        }),
      });

      if (response.ok) {
        // Redirect back to home page
        router.push("/profile");
        toast.success("Yayyy, Post updated!");
      } else {
        const res = await response.json();
        throw new Error(res.error);
      }
    } catch (err: any) {
      toast.error(err.message);
      setSubmitting(false);
    }
  };

  const fetchPost = async () => {
    const response = await fetch(`/api/prompt/${id}`);

    if (!response.ok) {
      toast.error("Failed to fetch post");
      return;
    }

    const data = await response.json();
    setPost(data.data);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchPost();
    }
  }, [session?.user?.id]);

  return (
    <div>
      <ToastContainer />
      <Form
        handleSubmit={handleEdit}
        post={post}
        type="Update"
        setPost={setPost}
        submitting={submitting}
      />
    </div>
  );
};

export default EditPrompt;
