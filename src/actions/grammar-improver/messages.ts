import { ChatCompletionRequestMessageRoleEnum } from "openai";

export const system = {
  role: ChatCompletionRequestMessageRoleEnum.System,
  content: "Improve the english.",
};

export function getMessages(userText: string) {
  const user = {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: userText,
  };

  return [system, user];
}
