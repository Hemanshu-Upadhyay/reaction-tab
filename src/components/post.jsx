import React, { useState } from "react";
import ReactionModal from "./ReactionModel";
import { useUser } from "../userContext";

const Post = ({ content, initialReactions }) => {
  const user = useUser();
  const [showReactions, setShowReactions] = useState(false);
  const [hoveringReactions, setHoveringReactions] = useState(false);
  const [reactions, setReactions] = useState(initialReactions || []);
  const [userReaction, setUserReaction] = useState(
    reactions.find((r) => r.user.id === user.id) || null
  );
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    if (!userReaction) {
      setShowReactions(true);
    }
  };

  const handleMouseLeave = () => {
    if (!hoveringReactions) {
      setShowReactions(false);
    }
  };

  const handleReactionClick = (reaction) => {
    if (userReaction?.reaction === reaction) {
      removeReaction();
    } else {
      const updatedReactions = reactions.filter((r) => r.user.id !== user.id);
      setReactions([...updatedReactions, { user, reaction }]);
      setUserReaction({ user, reaction });
      setShowReactions(false);
    }
  };

  const handleLikeClick = () => {
    if (userReaction?.reaction === "👍") {
      removeReaction();
    } else {
      handleReactionClick("👍");
    }
  };

  const removeReaction = () => {
    setReactions(reactions.filter((r) => r.user.id !== user.id));
    setUserReaction(null);
  };

  const handleReactionsMouseEnter = () => {
    setHoveringReactions(true);
  };

  const handleReactionsMouseLeave = () => {
    setHoveringReactions(false);
    setShowReactions(false);
  };

  return (
    <div className="post">
      <p>{content}</p>
      <div
        className="like-button-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={handleLikeClick}
          className={`like-button ${userReaction ? "liked" : ""}`}
        >
          {userReaction ? userReaction.reaction : "👍"}
          {reactions.length > 0 && <span>({reactions.length})</span>}
        </button>
        {showReactions && (
          <div
            className="reactions"
            onMouseEnter={handleReactionsMouseEnter}
            onMouseLeave={handleReactionsMouseLeave}
          >
            <span
              className="reaction-emoji"
              onClick={() => handleReactionClick("😊")}
            >
              😊
            </span>
            <span
              className="reaction-emoji"
              onClick={() => handleReactionClick("😢")}
            >
              😢
            </span>
            <span
              className="reaction-emoji"
              onClick={() => handleReactionClick("👏")}
            >
              👏
            </span>
            <span
              className="reaction-emoji"
              onClick={() => handleReactionClick("🎉")}
            >
              🎉
            </span>
          </div>
        )}
      </div>
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
