import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function agent(input:string) {   
    const response = await ai.interactions.create({
        model:"gemini-2.5-flash",
        input,
        generation_config: {
            thinking_level: "low",
        },
    })
    if (!response) throw new Error("Failed to get sesponse");
    return response;
}