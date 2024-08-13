import React from "react";

const ReactionModal = ({ reactions, onClose, showReactionCount }) => {
  const reactionCounts = reactions.reduce((acc, reaction) => {
    acc[reaction.reaction] = (acc[reaction.reaction] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="reaction-modal">
      <button onClick={onClose}>Close</button>
      <ul>
        {Object.entries(reactionCounts).map(([reaction, count], index) => (
          <li key={index}>
            {count} people reacted with {reaction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactionModal;
