import { ChatCompletionRequestMessageRoleEnum } from "openai";

export const system = {
  role: ChatCompletionRequestMessageRoleEnum.System,
  content:
    "Give alternative text. Try to make it different from the original text. It doesn't have to be grammatically correct.",
};

export function getMessages(userText: string) {
  const user = {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: userText,
  };

  return [system, user];
}
