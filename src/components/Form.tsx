import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

export interface Post {
  prompt: string;
  tag: string;
}

interface FormProps {
  type: "Create" | "Update";
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: () => void;
}

const Form = (props: FormProps) => {
  const { type, handleSubmit, post, setPost, submitting } = props;

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share creative prompts with the world, and let your
        imagination run wild with the endless possibilities.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            placeholder="Write your prompt here...."
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            value={post.prompt}
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            placeholder="#tag"
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            value={post.tag}
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? "Loading..." : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
