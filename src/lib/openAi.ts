import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openAI = new OpenAIApi(configuration);
export const openAIfetch = process.env.OPENAI_FETCH || "false";
