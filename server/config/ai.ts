import { GoogleGenAI } from "@google/genai";

const ai=new GoogleGenAI({
    apiKey:process.env.Gemini_API_KEY as string
})

export default ai;
