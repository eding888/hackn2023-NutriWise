import OpenAI from 'openai';
//set api key found in .env file
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

async function chatGPTQuery(query: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: query }],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0].message;
}


export interface GptQuery {
  breakfast_foods: string,
  lunch_foods: string,
  dinner_foods: string,
  snacks: string,
  allergies: string,
  age: number,
  weight: number,
  height: string,
  gender: string,
  activity_level: string,
  target_nutrition_goal: string,
  medications: string
}


export const gptQueryJson = async(config: GptQuery) => {
  const q = "I eat "+config.lunch_foods+" for lunch. I eat "+config.breakfast_foods+" for breakfast. I eat "+config.dinner_foods+" for dinner. I ate "+config.snacks+" for snacks. I am allergic to "+config.allergies+".I am "+config.weight+" pounds. I am "+config.age+" years old. I am a "+config.gender+". I am "+config.height+" feet tall. My activity level is "+config.activity_level+". My nutrition goal is to "+config.target_nutrition_goal+". I am on "+config.medications+" medications. Ouput the missing vitamins of this diet plan. Output whether or not this meal plan meets my required caloric intake. If the meal does not meet the required caloric intake and vitamin intake, suggest foods to add or remove in order to supplement this plan. Ouput in a json file format that corresponds to the following type: type Response = {missing_vitamins: vitamin[]; foods_to_add: food[]; foods_to_remove: food[]; suggestions_for_diet: suggestions[]}; type Food= {name: string; vitamins: string[]; calories: number; } type Vitamin = {name: string; } type Suggestion = {suggestion: string} If you do not know, just estimate. But I want the response to ONLY match the json."
  const t = ((await chatGPTQuery(q)).content);
  if(!t) {
    return null;
  }
  return(JSON.parse(t));
}


