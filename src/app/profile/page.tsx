"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = () => {};
  const handleDelete = async () => {};

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user?.id}/posts`);

    if (!response.ok) {
      toast.error("Failed to fetch prompts");
      return;
    }

    const data = await response.json();
    setPosts(data.data);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session?.user]);

  return (
    <div>
      <Profile
        name={"My"}
        data={posts}
        handleEdit={() => handleEdit()}
        handleDelete={() => handleDelete()}
        desc="Welcome to your personalized profile page"
      />
    </div>
  );
};

export default MyProfile;
