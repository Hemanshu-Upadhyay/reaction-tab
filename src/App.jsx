import React from "react";
import Post from "./components/post";
import { UserProvider } from "./userContext";

const App = () => {
  const initialReactions = [
    { user: { id: 2, name: "Hemanshu" }, reaction: "😊" },
    { user: { id: 3, name: "Mithun" }, reaction: "👏" },
    { user: { id: 3, name: "Archana" }, reaction: "🎉" },
    { user: { id: 3, name: "Hari" }, reaction: "👏" },
  ];

  return (
    <UserProvider>
      <div className="app">
        <Post content="This is a post." initialReactions={initialReactions} />
      </div>
    </UserProvider>
  );
};

export default App;
