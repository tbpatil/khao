import React from "react";
import { useState } from "react";
import "./main.css";

import Recipe from "./Recipe.js"; // Replace with the path to your transition page file

export const HomePage = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransition = () => {
    setIsTransitioning(true);
  };

  if (!isTransitioning) {
    return (
      <div>
        <div className="container">
          <div className="box">
            <h1>KHÄO</h1>
          </div>
        </div>
        {!isTransitioning && (
          <div className="slide-up">
            <div className="arrow" onClick={handleTransition}></div>
            <h3>Click to transition to another page</h3>
          </div>
        )}
      </div>
    );
  } else {
    return <Recipe />;
  }
};
