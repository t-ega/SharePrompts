import React from "react";

interface IPromptCard {
  prompt: string;
  tag: string;
  username: string;
  handleTagClick: () => void;
}

const PromptCard = (props: IPromptCard) => {
  const { prompt, tag, username, handleTagClick } = props;

  return <div>{prompt}</div>;
};

export default PromptCard;
