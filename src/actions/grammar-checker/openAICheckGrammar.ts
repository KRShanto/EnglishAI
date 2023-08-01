"use server";

import { openAI } from "@/lib/openAi";
import {
  ChatCompletionFunctions,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";
import { functions } from "./functions";
import { getMessages } from "./messages";

// A server action to check the grammar of the text using openAI API
// TODO: handle text length
export async function openAICheckGrammar(text: string) {
  const messages = getMessages(text);
  const openAIfetch = process.env.OPENAI_FETCH || "false";

  let response;

  if (openAIfetch === "true") {
    const completion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      functions,
      function_call: { name: "check_grammar" },
    });

    const functionCall = completion.data.choices[0].message?.function_call;

    console.log("Response: ", functionCall);

    const args = functionCall?.arguments;

    response = JSON.parse(args || "{}");
  } else {
    const result = `{
    "text": "${text}",
    "result": {
      "isCorrect": true,
      "correctText": "",
      "wrongText": [],
      "description": []
    }
  }`;

    response = JSON.parse(result);
  }

  return response;
}
