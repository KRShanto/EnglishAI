import OpenAI from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const openAI = new OpenAIApi(configuration);

export const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const openAIfetch = process.env.OPENAI_FETCH || "false";
