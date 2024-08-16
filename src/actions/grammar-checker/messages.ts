export const system = {
  role: "system",
  content:
    "You are a English grammar checker bot. Check whether their grammar is right or wrong. Call the function `check_grammar` with the text and result object. The result object should be a valid JSON object. You can use the examples below to understand the format. You shuold mark ONLY those parts of the text which are wrong. You can use the `wrong` property of the `wrongText` array to mark the wrong parts. You have to fill the function call arguments with the correct values.",
};

export const user1 = {
  role: "user",
  content: "My name shanto is and I wants to play",
};

export const assistant1 = {
  role: "function",
  content: JSON.stringify({
    text: "My name shanto is and I wants to play",
    result: {
      isCorrect: false,
      correctText: "My name is Shanto and I want to play",
      wrongText: [
        {
          text: "My name",
          wrong: false,
        },
        {
          text: "shanto is",
          wrong: true,
        },
        {
          text: "and I",
          wrong: false,
        },
        {
          text: "wants",
          wrong: true,
        },
        {
          text: "to play",
          wrong: false,
        },
      ],
    },
  }),
  name: "check_response",
};

export const user2 = {
  role: "user",
  content: "Ruhi go outside to play football yesterday",
};

export const assistant2 = {
  role: "function",
  content: JSON.stringify({
    text: "Ruhi go outside to play football yesterday",
    result: {
      isCorrect: false,
      correctText: "Ruhi went outside to play football yesterday",
      wrongText: [
        {
          text: "Ruhi",
          wrong: false,
        },
        {
          text: "go",
          wrong: true,
        },
        {
          text: "outside to play football yesterday",
          wrong: false,
        },
      ],
    },
  }),
  name: "check_response",
};

export const user3 = {
  role: "user",
  content: "I am going to school",
};

export const assistant3 = {
  role: "function",
  content: JSON.stringify({
    text: "I am going to school",
    result: {
      isCorrect: true,
      correctText: "",
      wrongText: [],
    },
  }),
  name: "check_response",
};

export function getMessages(userText: string) {
  const user4 = {
    role: "user",
    content: userText,
  };

  return [
    system,
    user1,
    assistant1,
    user2,
    assistant2,
    user3,
    assistant3,
    user4,
  ];
}
