export const functions = [
  {
    name: "check_grammar",
    description: "English Grammar checker. Whether the text is correct or not",
    parameters: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The text to check",
        },
        result: {
          type: "object",
          properties: {
            isCorrect: {
              type: "boolean",
              description: "Whether the whole text is correct or not",
            },
            correctText: {
              type: "string",
              description: "The correct text",
            },
            wrongText: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  text: {
                    type: "string",
                    description: "The wrong or corrent part of the text",
                  },
                  wrong: {
                    type: "boolean",
                    description: "Whether the part of the text is wrong or not",
                  },
                },
              },
            },
          },
        },
      },
      required: ["text", "result", "isCorrect", "correctText", "wrongText"],
    },
  },
];
