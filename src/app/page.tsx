"use client";
import Feed from "@components/Feed";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import PromptCardSkeleton from "./prompt-skeleton";

const Home = () => {
  return (
    <>
      <ToastContainer />
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            {" "}
            AI powered prompts
          </span>
        </h1>
        <p className="desc text-center">
          Promptopia is an open source AI prompting tool for modern world to
          discover, create, and share creative prompts
        </p>

        <Feed />
      </section>
    </>
  );
};

export default Home;
