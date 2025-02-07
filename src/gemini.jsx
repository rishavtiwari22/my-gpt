import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_API;
const genAI = new GoogleGenerativeAI(`${apiKey}`);

export default async function getGPTResponse(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let summary = response.text();
    console.log('Summery -',summary);
    return summary;
    
}




