import { config } from "dotenv";
config()
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY as string;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export default async function runGemini(inputRequest:string) {
    const chatSession = model.startChat({generationConfig});
  
    const result = await chatSession.sendMessage(inputRequest);
    return result;
  }
  