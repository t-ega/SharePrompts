import React from "react";
import PromptCard from "./PromptCard";
import { IPost } from "@utils/types";

interface IProfile {
  name: string;
  data: IPost[] | undefined;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  desc: string;
}

const Profile = (props: IProfile) => {
  const { name, desc, data, handleEdit, handleDelete } = props;
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>{" "}
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data &&
          data.map((prompt, index) => (
            <PromptCard
              key={index}
              post={prompt}
              handleDelete={() => handleDelete && handleDelete(prompt._id)}
              handleEdit={() => handleEdit && handleEdit(prompt._id)}
              handleTagClick={() => {}}
            />
          ))}
      </div>
    </section>
  );
};

export default Profile;
