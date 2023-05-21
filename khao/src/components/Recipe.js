import React, { useState } from "react";
import axios from "axios";
import "./Recipe.css";
import Mid from "./mid.js";


const apiKey = "2737549ea57b4f41b76eb6a0178b6c28";
const endpoint = "https://khao.cognitiveservices.azure.com/";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const image_to_ingrediants = async (message) => {
  let prompt = `You are a Gymbro. You are supposed to filter out all the edible items out of a junk list of words received from an OCR and make it into a list.
    You:OLIVE OIL POTATO CHIPS.. HUMMUS GARLIC ROASTED EC CHEDDAR NEW ZEALAND SHARP PITA WHOLE WHEAT 5" OLIVES MANZANILLA CREAMY SALTED PEANUT BUTTER SUBTOTAL STATE TAX I TOTAL ITEMS 6 TRADER •ors 44 East Ontario Street Chicago IL 60611 Store #696 - (312) 951-6369 OPEN 8:00AM TO 10:00PM DAILY 3.71 2.29 2.49 1.99 I .99 I .69 $14.16 $0.32 $14.48 v, Karl 05-31-2015 03:11PM 0696 06 1173 0559 THANK YOU FOR SHOPPING AT TRADER JOE'S www.traderjoes.com
    Gymbro:["Olive Oil","Potato Chips","Hummus","Garlic","Cheddar","Pita","Whole Wheat","Olives","Manzanilla","Peanut Butter","Salt"]`;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + "User: " + message + "\nGymbro:",
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

const ingrediants_to_recipe = async (message) => {
  let prompt = `Marv is a recipe recommender bot, The user inputs a string with ingredients separated by ','.
    Only give 6 recipes. 
    give the results in the form of a LIST separated with commas, and dont mention the categories
    
    Ingredients="soy,beans,chicken,eggs,spinach,broccoli"
    Spinach and Broccoli Stir-Fry with Soy Sauce, Bean and Spinach Enchiladas, Chicken and Spinach Alfredo Pasta, Soy-Marinated Grilled Chicken with Steamed Broccoli, Vegan Tofu Scramble with Spinach and Beans, Soy-Glazed Roasted Broccoli.
    Ingredients="soy,beans,chicken,eggs,spinach,broccoli,bell peppers,turkey,beef,paneer,tofu"
    Paneer and Bell Pepper Stir-Fry, Spinach and Bean Salad with Soy Dressing, Chicken and Spinach Stuffed Bell Peppers, Spinach and Chicken Omelette, Tofu and Bell Pepper Stir-Fry, Bean and Tofu Tacos."`;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + "User: " + message + "\n Marv:",
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

function Recipe() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `${endpoint}/vision/v3.1/ocr?language=en`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Ocp-Apim-Subscription-Key": apiKey,
          },
        }
      );

      // var data = JSON.stringify({
      //   collection: "Login_Details",
      //   database: "Login",
      //   dataSource: "KHAO",
      //   projection: {
      //     _id: 1,
      //   },
      // });

      // const login = await axios.post(
      //   `https://us-west-2.aws.data.mongodb-api.com/app/data-rdkxr/endpoint/data/v1/action/findOne`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Access-Control-Request-Headers": "*",
      //       "api-key":"yNh4S1DmxcuDV39j8kuaCwGA014DPluj7enAXxE33jQOAtRkaPhXeTDuiMPy7TRN",
      //     },
      //     data: data,
      //   }
      // );
      // console.log(login);

      const regions = response.data.regions;
      let extractedText = "";

      regions.forEach((region) => {
        region.lines.forEach((line) => {
          line.words.forEach((word) => {
            extractedText += word.text + " ";
          });
          extractedText += "\n";
        });
      });

      setResult(extractedText);
      console.log(extractedText);
      const ingrediants = await image_to_ingrediants(extractedText);
      console.log(ingrediants);
      localStorage.setItem("ingrediants", ingrediants);

      const recipes = await ingrediants_to_recipe(ingrediants);
      console.log(recipes);
      let recipe_type = recipes.split(",");
      localStorage.setItem("recipe", recipe_type);

      

    } catch (error) {
      console.error("Error analyzing image:", error);
    }
    setIsTransitioning(true);
  };
  if (!isTransitioning) {
    
    return (

      <div>
        <a className="go_back" href="front.html">
          Go Back
        </a>
        <div className="background-image"></div>
        <div className="container">

          <div className="company-name">
            KHÄO
          </div>
          <form onSubmit={handleSubmit}>
            <div></div>
            <div className="upload-box">
              <img className="upload-image" src="./upload.jpg" alt="Upload Image"/>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    );
  } else {
    return <Mid />;
  }
}

export default Recipe;
