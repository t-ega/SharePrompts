"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { toast } from "react-toastify";
import { IPost } from "@utils/types";

interface IPromptCardList {
  data: IPost[] | undefined;
  handleTagClick: () => void;
}

const PromptCardList = (props: IPromptCardList) => {
  const { data, handleTagClick } = props;

  return (
    <div className="mt-16 prompt_layout">
      {data &&
        data.map((prompt, index) => (
          <PromptCard
            key={index}
            prompt={prompt.post}
            tag={prompt.tag}
            username={prompt.username}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<IPost[]>();

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const fetchPosts = async () => {
    const response = await fetch(`/api/prompt`);

    if (!response.ok) {
      toast.error("Failed to fetch prompts");
      return;
    }

    const data = await response.json();
    setPosts(data.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a prompt, or username or tag!"
          value={searchText}
          required
          className="search_input peer"
          onChange={handleSearchText}
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
