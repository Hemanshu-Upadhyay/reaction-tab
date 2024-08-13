import React from "react";
import Post from "./post";

const DummyPosts = () => {
  const posts = [
    {
      content: "This is the first post",
      initialReactions: [{ user: "User1", reaction: "😊" }],
    },
    {
      content: "This is the second post",
      initialReactions: [{ user: "User2", reaction: "😢" }],
    },
    {
      content: "This is the third post",
      initialReactions: [{ user: "User3", reaction: "👏" }],
    },
  ];

  return (
    <div>
      {posts.map((post, index) => (
        <Post
          key={index}
          content={post.content}
          initialReactions={post.initialReactions}
        />
      ))}
    </div>
  );
};

export default DummyPosts;
