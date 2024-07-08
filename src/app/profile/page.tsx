"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [executing, setExecuting] = useState(false);

  const handleEdit = (id: string) => {
    router.push(`/edit-prompt/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;

    setExecuting(true);
    if (executing) return;

    const response = await fetch(`/api/prompt/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Failed to delete prompt");
      return;
    }

    const posts = await fetchPosts();
    setPosts(posts);
    toast.success("Prompt deleted successfully");
    setExecuting(false);
  };

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user?.id}/posts`);

    if (!response.ok) {
      toast.error("Failed to fetch prompts");
      return;
    }

    const data = await response.json();
    setPosts(data.data);
    return data.data;
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
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        desc="Welcome to your personalized profile page"
      />
    </div>
  );
};

export default MyProfile;
