import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { stringify } from "querystring";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json(
      { error: "Invalid", msg: "Text is required" },
      { status: 400 }
    );
  }

  const prompt = `You have to correct the sentence I am going to give,
I am building an english checking site and I am giving you a type and some examples. You just have to response corresponding to the examples and type. The result should be a valid json object. You have to use signle quote inside description strings. You can use the examples below to understand the format.
type:
{
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

example1:
{
  "text": "My name shanto is and I wants to play",
  "result": {
    "isCorrect": false,
    "correctText": "My name is Shanto and I want to play",
    "wrongText": [
      {
        "text": "My name",
        "wrong": false
      },
      {
        "text": "shanto is",
        "wrong": true
      },
      {
        "text": "and I",
        "wrong": false
      },
      {
        "text": "wants",
        "wrong": true
      },
      {
        "text": "to play",
        "wrong": false
      }
    ],
    "description": [
      "Missing capitalization: The name 'shanto' should begin with a capital letter since it appears to be a proper noun.",
      "Subject-verb agreement: The verb 'is' is incorrectly placed after the name, rather than before it. It should be 'My name is Shanto' instead.",
      "Verb tense: The verb 'wants' should be changed to the present tense to match the subject 'I.' It should be 'I want' instead."
    ]
  }
}

example2:
{
  "text": "Ruhi go outside to play football yesterday",
  "result": {
    "isCorrect": false,
    "correctText": "Ruhi went outside to play football yesterday",
    "wrongText": [
      {
        "text": "Ruhi",
        "wrong": false
      },
      {
        "text": "go",
        "wrong": true
      },
      {
        "text": "outside to play football yesterday",
        "wrong": false
      }
    ],
    "description": [
      "Verb tense: The verb 'go' should be changed to the past tense to match the adverb 'yesterday.' It should be 'went' instead."
    ]
  }
}


example3:
{
  "text": "I am going to school",
  "result": {
    "isCorrect": true,
    "correctText": "",
    "wrongText": [],
    "description": []
  }
}

The text is: ${text}}`;

  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt,
  //   temperature: 0,
  //   max_tokens: 2000,
  //   top_p: 1.0,
  //   frequency_penalty: 0.0,
  //   presence_penalty: 0.0,
  // });

  // console.log(response.data.choices[0].text);

  // return NextResponse.json(JSON.parse(response.data.choices[0].text || "{}"));

  const result = `{
  "text": "I am going to school",
  "result": {
    "isCorrect": true,
    "correctText": "",
    "wrongText": [],
    "description": []
  }
}`;

  return NextResponse.json(JSON.parse(result));
}
