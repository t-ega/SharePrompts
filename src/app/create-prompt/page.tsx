"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);

  const [post, setPost] = useState({
    post: "",
    tag: "",
  });

  const createPrompts = async () => {
    setSubmitting((prev) => !prev);
    // setSubmitting(false)
  };

  return (
    <div>
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
