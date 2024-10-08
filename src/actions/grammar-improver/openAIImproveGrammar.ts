"use server";

import { openAI } from "@/lib/openAi";
import { getMessages } from "./messages";
import { openAIfetch } from "@/lib/openAi";
import { GrammarImproverResult } from "@/types/grammar";

// TODO: throw error if response type doesn't match
export async function openAIImproveGrammar(
  text: string
): Promise<GrammarImproverResult & { error?: boolean }> {
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
    // wait for 4 second
    await new Promise((resolve) => setTimeout(resolve, 4000));

    response = "My name is Shanto";
  }

  return {
    text,
    improvedText: response,
  };
}
