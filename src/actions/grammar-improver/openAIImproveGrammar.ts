"use server";

import { openAI } from "@/lib/openAi";
import { getMessages } from "./messages";
import { openAIfetch } from "@/lib/openAi";

export async function openAIImproveGrammar(text: string) {
  const messages = getMessages(text);

  let response;

  if (openAIfetch === "true") {
    const completion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    response = completion.data.choices[0].message?.content || "";
  } else {
    response = "My name is Shanto";
  }

  return {
    text,
    improvedText: response,
  };
}
