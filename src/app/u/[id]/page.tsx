"use client";

import Profile from "@components/Profile";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IParams {
  id: string;
}
const UserProfile = ({ params }: { params: IParams }) => {
  const [posts, setPosts] = useState([]);
  const [executing, setExecuting] = useState(false);
  const [user, setuser] = useState("");

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${params.id}/posts`);

    if (!response.ok) {
      toast.error("Failed to fetch prompts");
      return;
    }

    const data = await response.json();
    setPosts(data.data);
    setuser(data.data[0].creator.username);
    return data.data;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Profile
        name={user}
        data={posts}
        desc={`Here you can see all the prompts created by ${user}.`}
      />
    </div>
  );
};

export default UserProfile;
