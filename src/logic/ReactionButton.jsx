import React, { useState } from "react";

const ReactionButton = ({ initialReactions, user, onUpdate }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [hoveringReactions, setHoveringReactions] = useState(false);
  const [reactions, setReactions] = useState(initialReactions || []);
  const [userReaction, setUserReaction] = useState(
    reactions.find((r) => r.user.id === user.id) || null
  );

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
      const newReactions = [...updatedReactions, { user, reaction }];
      setReactions(newReactions);
      setUserReaction({ user, reaction });
      setShowReactions(false);
      onUpdate(newReactions);
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
    const updatedReactions = reactions.filter((r) => r.user.id !== user.id);
    setReactions(updatedReactions);
    setUserReaction(null);
    onUpdate(updatedReactions);
  };

  const handleReactionsMouseEnter = () => {
    setHoveringReactions(true);
  };

  const handleReactionsMouseLeave = () => {
    setHoveringReactions(false);
    setShowReactions(false);
  };

  return (
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
  );
};

export default ReactionButton;
