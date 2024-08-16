export const system = {
  role: "system",
  content: "Improve the english.",
};

export function getMessages(userText: string) {
  const user = {
    role: "user",
    content: userText,
  };

  return [system, user];
}
