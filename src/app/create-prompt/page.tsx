"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const session = useSession();
  const router = useRouter();

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompts = async () => {
    setSubmitting(true);

    try {
      const response = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          userId: session.data?.user?.id,
        }),
      });

      if (response.ok) {
        // Redirect back to home page
        router.push("/");
        toast.success("Yayyy, Post created!");
      } else {
        const res = await response.json();
        throw new Error(res.error);
      }
    } catch (err: any) {
      toast.error(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Form
        handleSubmit={createPrompts}
        post={post}
        type="Create"
        setPost={setPost}
        submitting={submitting}
      />
    </div>
  );
};

export default CreatePrompt;
