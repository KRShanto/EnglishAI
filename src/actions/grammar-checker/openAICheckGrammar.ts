"use server";

import { openAI } from "@/lib/openAi";
import { functions } from "./functions";
import { getMessages } from "./messages";
import { openAIfetch } from "@/lib/openAi";
import { GrammarCheckerResult } from "@/types/grammar";

// A server action to check the grammar of the text using openAI API
// TODO: handle text length
// TODO: throw error if response type doesn't match
export async function openAICheckGrammar(
  text: string
): Promise<GrammarCheckerResult & { error?: boolean }> {
  const messages = getMessages(text);

  let response;

  console.log("Checking grammar: ", text);

  if (openAIfetch === "true") {
    const completion = await openAI.chat.completions.create({
      // TODO: use the latest api
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      // @ts-ignore
      messages,
      functions,
      function_call: { name: "check_grammar" },
    });

    const functionCall = completion.choices[0].message?.function_call;

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

    // wait for 4 second
    await new Promise((resolve) => setTimeout(resolve, 4000));

    response = JSON.parse(result);
  }

  return response;
}
