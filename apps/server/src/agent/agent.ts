import { GoogleGenAI } from "@google/genai";
import { schema, system_instruction } from "./systemInstruction";
import { tools } from "./tools";

if (!process.env.GEMINI_API_KEY) {
  console.log("> THERE IS NO GEMINI API KEY");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function agent(input: string) {
  const response = await ai.interactions.create({
    model: "gemini-3-flash-preview",
    system_instruction,
    input,
    generation_config: {
      thinking_level: "low",
    },
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema,
    },
    tools: tools,
  });
  if (!response) throw new Error("Failed to get sesponse");
  return response;
}