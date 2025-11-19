import React from "react";
import "../Styles/ActionCard.css";


const ActionCard = ({ title, subtext, icon, onClick }) => {
  return (
    <div className="action-card" onClick={onClick}>
      <div className="icon">{icon}</div>
      <div className="details">
        <h3>{title}</h3>
        <p>{subtext}</p>
      </div>
    </div>
  );
};

export default ActionCard;