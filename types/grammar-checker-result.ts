interface GrammarCheckerResult {
  text: string;
  result: {
    isCorrect: boolean;
    correctText: string;
    wrongText: {
      text: string;
      wrong: boolean;
    }[];
    description: string[];
  };
}

/* Example 
text: "My name shanto is and I wants to play"

shoould return:

{
    text: "My name shanto is",
    result: {
        correctText: "My name is Shanto",
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
                wrong: false
            },
            {
                text: "wants",
                wrong: true,
            }
            {
                text: "to play",
                wrong: false
            }
        ],
        description: [
            "Missing capitalization: The name "shanto" should begin with a capital letter since it appears to be a proper noun.",
            "Subject-verb agreement: The verb "is" is incorrectly placed after the name, rather than before it. It should be "My name is Shanto" instead.",
            "Verb tense: The verb "wants" should be changed to the present tense to match the subject "I." It should be "I want" instead."
        ]
    }
}


*/
