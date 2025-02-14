import { IPost } from "@utils/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface IPromptCard {
  post: IPost;
  handleTagClick: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const PromptCard = (props: IPromptCard) => {
  const { post, handleTagClick, handleDelete, handleEdit } = props;
  const [copied, setCopied] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);

    setCopied(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 5000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={() => {
            if (post.creator._id === session?.user?.id) {
              router.push("/profile");
              return;
            }
            router.push(`/u/${post.creator._id}`);
          }}
        >
          <Image
            src={post.creator?.image || "/assests/images/user.png"}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={
              copied === post.prompt
                ? "/assests/icons/tick.png"
                : "/assests/icons/copy.png"
            }
            width={40}
            height={40}
            alt="copy_btn"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor_pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user?.id === post.creator._id &&
        window.location.pathname === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit Post
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete Post
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
