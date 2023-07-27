import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

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

  const prompt = `You have to correct the sentence I am going to give,\n I am building an english checking site and I am giving you a type and some examples. You just have to response corresponding to the examples and type. The result should be a valid json object. You have to use signle quote inside description strings. There is a chances that each sentences won't relate to each other. So you better be careful. You can use the examples below to understand the format.\n type:\n {\n text: string;\n result: {\n isCorrect: boolean;\n correctText: string;\n wrongText: {\n text: string;\n wrong: boolean;\n }[];\n description: string[];\n };\n }\n\n example1:\n {\n"text":"My name shanto is and I wants to play",\n "result": {\n "isCorrect": false,\n "correctText": "My name is Shanto and I want to play",\n "wrongText": [\n {\n "text":"My name",\n "wrong": false\n },\n {\n "text": "shanto is",\n "wrong": true\n },\n {\n "text": "and I",\n "wrong": false\n },\n {\n "text": "wants",\n "wrong": true\n },\n {\n "text": "to play",\n "wrong": false\n }\n ],\n "description": [\n "Missing capitalization: The name 'shanto' should begin with a capital letter since it appears to be a proper noun.",\n "Subject-verb agreement: The verb 'is' is incorrectly placed after the name, rather than before it. It should be 'My name is Shanto' instead.",\n "Verb tense: The verb 'wants' should be changed to the present tense to match the subject 'I.' It should be 'I want' instead."\n ]\n }\n }\n\n example2:\n {\n "text": "Ruhi go outside to play football yesterday",\n "result": {\n "isCorrect": false,\n "correctText": "Ruhi went outside to play football yesterday",\n "wrongText": [\n {\n "text": "Ruhi",\n "wrong": false\n },\n {\n "text": "go",\n "wrong": true\n },\n{\n "text": "outside to play football yesterday",\n "wrong": false\n }\n ],\n "description": [\n "Verb tense: The verb 'go' should be changed to the past tense to match the adverb 'yesterday.' It should be 'went' instead."\n ]\n }\n }\n\n\n example3:\n {\n "text": "I am going to school",\n "result": {\n "isCorrect": true,\n "correctText": "",\n "wrongText": [],\n "description": []\n  }\n }\n\n The text is: ${text}`;

  const openAIfetch = process.env.OPENAI_FETCH || "false";
  let response;

  if (openAIfetch === "true") {
    const openAiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    console.log(openAiResponse.data.choices[0].text);

    response = JSON.parse(openAiResponse.data.choices[0].text || "{}");
  } else {
    const result = `{
    "text": "I am going to school",
    "result": {
      "isCorrect": true,
      "correctText": "",
      "wrongText": [],
      "description": []
    }
  }`;

    response = JSON.parse(result);
  }

  return NextResponse.json(response);
}
