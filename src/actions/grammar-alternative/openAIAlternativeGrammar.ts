"use server";

import { openAI } from "@/lib/openAi";
import { openAIfetch } from "@/lib/openAi";
import { getMessages } from "./messages";
import { GrammarAlternativeResult } from "@/types/grammar";

// TODO: throw error if response type doesn't match
export async function openAIAlternativeGrammar(
  text: string
): Promise<GrammarAlternativeResult & { error?: boolean }> {
  const messages = getMessages(text);

  let response;

  if (openAIfetch === "true") {
    const completion = await openAI.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      // @ts-ignore
      messages,
    });

    response = completion.choices[0].message?.content || "";
  } else {
    response = "My name is Shanto";
  }

  return {
    text,
    alternative: response,
  };
}
