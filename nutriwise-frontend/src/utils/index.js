import OpenAI from 'openai';

//set api key found in .env file
const openai = new OpenAI({
  apiKey: "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"
});

async function chatGPTQuery(query) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: query }],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0].message;
}



const breakfast_foods = "ice cream, donuts, brownies, mcdonalds, chicken nuggets";
const lunch_foods = "bojangles, ice cream, donuts, brownies"
const dinner_foods = "ice cream";
const snacks = "cookies";
const allergies = "tomatoes";
const age = 20;
const weight = 200;
const height = "5 foot 11 inches";
const gender = "male";
const activity_level = "sedentary";
const target_nutrition_goal = "lost weight";
const medications = "adderall";

const q = "I eat "+lunch_foods+" for lunch. I eat "+breakfast_foods+" for breakfast. And "+dinner_foods+" for dinner. I am allergic to "+allergies+".I am "+weight+" pounds. I am "+age+" years old. I am a "+gender+". I am "+height+" feet tall. My activity level is "+activity_level+". My nutrition goal is to "+target_nutrition_goal+". I am on "+medications+" medications. Ouput the missing vitamins of this diet plan. Output whether or not this meal plan meets my required caloric intake. If the meal does not meet the required caloric intake and vitamin intake, suggest foods to add or remove in order to supplement this plan. Ouput in a json file format that corresponds to the following type: type Response = {missing_vitamins: vitamin[]; foods_to_add: food[]; foods_to_remove: food[];}; type Food= {name: string; vitamins: string[]; calories: number; } type Vitamin = {name: string; } If you do not know, just estimate. But I want the response to ONLY match the json."

const t = ((await chatGPTQuery(q)).content);

const k = JSON.parse(t);

