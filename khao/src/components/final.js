import React from "react";
import { useState } from "react";
import "./final.css"

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function Final(){

    const final_recipe = localStorage.getItem("final_recipe");
    const detailed_recipe_text = localStorage.getItem("detailed_recipe");
    console.log(detailed_recipe_text)

  return (
    <div>
        <div className="container">
          <div className="background-image"></div>
          <div className="company-name">
            KHÄO
          </div>
          <div className="container2">
          <div className="textbox-left"> {final_recipe} 
          {/* <div className="recipe_box"> */}
            <div className="textbox-left">{detailed_recipe_text}</div>
            </div>
            <img className="circle-image" src = {localStorage.getItem("image_url")} />
          </div>

        </div>
        
    </div>
  )
};

export default Final;
