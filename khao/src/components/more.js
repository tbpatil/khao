import React, { useState } from "react";
import axios from "axios";
import "./more.css";

import Final from "./final.js";

const apiKey = "2737549ea57b4f41b76eb6a0178b6c28";
const endpoint = "https://khao.cognitiveservices.azure.com/";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function More() {
  const food_list = localStorage.getItem("more_food");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmission = (label) => {
    setIsTransitioning(true);
    console.log(label);
  };

  console.log(food_list);

  const buttonsData = [
    { id: 1, label: "hi" },
    { id: 2, label: "hi" },
    { id: 3, label: "hi" },
    { id: 4, label: "hi" },
    { id: 5, label: "hi" },
    { id: 6, label: "hi" },
  ];

  // console.log(food_list);

  return (
    <div className="container">
      <div className="company-name">KHÄO</div>
      <div className="grid">
        {buttonsData.map((button) => (
          <button
            key={button.id}
            className="big-button"
            onClick={() => handleSubmission(button.label)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default More;
