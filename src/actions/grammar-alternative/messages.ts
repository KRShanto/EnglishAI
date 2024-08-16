export const system = {
  role: "system",
  content:
    "Give alternative text. Try to make it different from the original text. It doesn't have to be grammatically correct.",
};

export function getMessages(userText: string) {
  const user = {
    role: "user",
    content: userText,
  };

  return [system, user];
}
