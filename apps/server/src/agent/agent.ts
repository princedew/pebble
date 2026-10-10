import { GoogleGenAI } from "@google/genai"
import { system_instruction } from "./systemInstruction"

if (!process.env.GEMINI_API_KEY) {
    console.log("> THERE ISNO GEMINI API KEY");
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function agent(input:string) {   
    const response = await ai.interactions.create({
        model:"gemini-3-flash-preview",
        system_instruction,
        input,
        generation_config: {
            thinking_level: "low",
        },
    })
    if (!response) throw new Error("Failed to get sesponse");
    return response;
}