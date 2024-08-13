import React, { useState } from "react";
import ReactionButton from "../logic/ReactionButton";
import ReactionModal from "./ReactionModel";
import { useUser } from "../userContext";

const Post = ({ content, initialReactions }) => {
  const user = useUser();
  const [reactions, setReactions] = useState(initialReactions || []);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateReactions = (updatedReactions) => {
    setReactions(updatedReactions);
  };

  return (
    <div className="post">
      <p>{content}</p>
      <ReactionButton
        initialReactions={reactions}
        user={user}
        onUpdate={handleUpdateReactions}
      />
      {reactions.length > 0 && (
        <div className="reactions-summary">
          {reactions.length > 2 ? (
            <span>
              {reactions[0].user.name} and {reactions.length - 1} others reacted
              to this post
            </span>
          ) : (
            reactions.map((r, index) => (
              <span key={index} className="reaction-display">
                {r.reaction}
              </span>
            ))
          )}
        </div>
      )}
      <button onClick={() => setShowModal(true)}>View Reactions</button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ReactionModal
              reactions={reactions}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
