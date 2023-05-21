import React, { useState } from "react";
import axios from "axios";
import "./mid.css";
import More from "./more.js";
import Final from "./final.js";

const apiKey = "2737549ea57b4f41b76eb6a0178b6c28";
const endpoint = "https://khao.cognitiveservices.azure.com/";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const detailed_recipe = async (message) => {
  let prompt = `grandma is a bot that prints out the ingredients, instructions, cooking time, preparation time, and the nutritional value such as calories,trans fat,sugar,total fat,saturated fat,cholestrol,sodium,total carbohydrate,dietry fiber,protien.
    The user enters the name of the recipe.`;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + "User: " + message + "\n grandma:",
      max_tokens: 1000,
    });



    return completion.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

const veg = async (message) => {
  let prompt = `grandma is a recipe recommender bot, The user inputs a string with ingredients separated by ','.
  Only give 6 vegetarian recipes. 
  give the results in the form of a LIST separated with commas, and dont mention the categories
  
  Ingredients="soy,beans,chicken,eggs,spinach,broccoli"
  Spinach and Broccoli Stir-Fry with Soy Sauce, Bean and Spinach Enchiladas, Chicken and Spinach Alfredo Pasta, Soy-Marinated Grilled Chicken with Steamed Broccoli, Vegan Tofu Scramble with Spinach and Beans, Soy-Glazed Roasted Broccoli.
  Ingredients="soy,beans,chicken,eggs,spinach,broccoli,bell peppers,turkey,beef,paneer,tofu"
  Paneer and Bell Pepper Stir-Fry, Spinach and Bean Salad with Soy Dressing, Chicken and Spinach Stuffed Bell Peppers, Spinach and Chicken Omelette, Tofu and Bell Pepper Stir-Fry, Bean and Tofu Tacos.
  `;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + "User: " + message + "\n grandma:",
      max_tokens: 1000,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

const nonveg = async (message) => {
  let prompt = `grandma is a recipe recommender bot, The user inputs a string with ingredients separated by ','.
  Only give 6 non-vegetarian recipes. 
  give the results in the form of a LIST separated with commas, and dont mention the categories
  
  Ingredients="soy,beans,chicken,eggs,spinach,broccoli"
  Spinach and Broccoli Stir-Fry with Soy Sauce, Bean and Spinach Enchiladas, Chicken and Spinach Alfredo Pasta, Soy-Marinated Grilled Chicken with Steamed Broccoli, Vegan Tofu Scramble with Spinach and Beans, Soy-Glazed Roasted Broccoli.
  Ingredients="soy,beans,chicken,eggs,spinach,broccoli,bell peppers,turkey,beef,paneer,tofu"
  Paneer and Bell Pepper Stir-Fry, Spinach and Bean Salad with Soy Dressing, Chicken and Spinach Stuffed Bell Peppers, Spinach and Chicken Omelette, Tofu and Bell Pepper Stir-Fry, Bean and Tofu Tacos.
  `;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + "User: " + message + "\n grandma:",
      max_tokens: 1000,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

const vegan = async (message) => {
  let prompt = `grandma is a recipe recommender bot, The user inputs a string with ingredients separated by ','.
  Only give 6 vegan recipes. 
  give the results in the form of a LIST separated with commas, and dont mention the categories
  
  Ingredients="soy,beans,chicken,eggs,spinach,broccoli"
  Spinach and Broccoli Stir-Fry with Soy Sauce, Bean and Spinach Enchiladas, Chicken and Spinach Alfredo Pasta, Soy-Marinated Grilled Chicken with Steamed Broccoli, Vegan Tofu Scramble with Spinach and Beans, Soy-Glazed Roasted Broccoli.
  Ingredients="soy,beans,chicken,eggs,spinach,broccoli,bell peppers,turkey,beef,paneer,tofu"
  Paneer and Bell Pepper Stir-Fry, Spinach and Bean Salad with Soy Dressing, Chicken and Spinach Stuffed Bell Peppers, Spinach and Chicken Omelette, Tofu and Bell Pepper Stir-Fry, Bean and Tofu Tacos.
  `;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + "User: " + message + "\n grandma:",
      max_tokens: 1000,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

function Mid() {
  const recipe_list = localStorage.getItem("recipe");
  const [isTransitioning, setIsTransitioning] = useState(false);
  //   console.log(recipe_list)
  let recipe_list_array = recipe_list.split(",");
  let food = "";

  const handleSubmission = async (label) => {
    setIsTransitioning(true);
    food = label;
    let text = "";
    try {
      if (label == "See more for Veg") {
        text = await veg(label);
      } else if (label == "see more for Nonveg") {
        text = await nonveg(label);
      } else if (label == "See more for vegan") {
        text = await vegan(label);
      } else {
        text = await detailed_recipe(label);
        localStorage.setItem("final_recipe", label);
        localStorage.setItem("detailed_recipe", text);
      }
      localStorage.setItem("more_food", text);
    } catch (error) {
      console.log(error);
    }
    // console.log(label);
  };

  const buttonsData = [
    { id: 1, label: recipe_list_array[0] },
    { id: 2, label: recipe_list_array[1] },
    { id: 3, label: recipe_list_array[2] },
    { id: 4, label: recipe_list_array[3] },
    { id: 5, label: recipe_list_array[4] },
    { id: 6, label: recipe_list_array[5] },
    { id: 7, label: "See more for Veg" },
    { id: 8, label: "see more for Nonveg" },
    { id: 9, label: "See more for vegan" },
  ];

  if (!isTransitioning) {
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
  } else if (
    food == "See more for Veg" ||
    food == "see more for Nonveg" ||
    food == "See more for vegan"
  ) {
    return (
      <div>
        <More />
      </div>
    );
  } else {
    return (
      <div>
        <Final />
      </div>
    );
  }
}

export default Mid;
