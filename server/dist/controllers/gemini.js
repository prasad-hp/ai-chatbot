"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const generative_ai_1 = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const chatSession = model.startChat({
            generationConfig,
            // safetySettings: Adjust safety settings
            // See https://ai.google.dev/gemini-api/docs/safety-settings
            history: [
                {
                    role: "user",
                    parts: [
                        { text: "how to use gemini api keys to create chat assistant\n" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "You can't directly use Gemini API keys to create a chat assistant. There is no public API for Gemini, meaning you can't directly interact with it using code.  \n\nHowever, there are a few options you can explore:\n\n**1. Using Google's AI Platform:**\n\n* **Vertex AI:**  Google offers Vertex AI, a platform for deploying and managing machine learning models, including large language models (LLMs) like PaLM 2 (the underlying model for Gemini). You can use Vertex AI to fine-tune a pre-trained model or train your own, then create an API endpoint to interact with it. This approach gives you control over your custom model and its specific capabilities.\n* **Generative AI App Builder:** Google provides a dedicated tool for building AI-powered chat assistants.  You can leverage their pre-built chatbot templates and customize them for your specific needs. This option is more user-friendly and requires less technical expertise.\n\n**2. Using Third-Party Services:**\n\n* **Hugging Face:**  Hugging Face is a popular platform for open-source LLMs. You can find pre-trained models similar to Gemini and use their API to integrate them into your application.\n* **OpenAI's API:**  OpenAI's API offers access to their powerful language models like GPT-3 and GPT-4. While not directly Gemini, you can utilize them to build robust chat assistants.\n\n**Steps to Build a Chat Assistant (General Approach):**\n\n1. **Choose Your Model:** Select a suitable LLM based on your requirements (cost, performance, capabilities).\n2. **API Integration:** Integrate the API of your chosen model into your application.\n3. **Build Frontend:** Develop a user interface (web, mobile, etc.) to interact with the chatbot.\n4. **Fine-Tuning (Optional):** If necessary, fine-tune the model for your specific domain or application using your own data.\n5. **Deployment:** Deploy your chat assistant on a server or cloud platform for accessibility.\n\n**Important Considerations:**\n\n* **Cost:** Using LLMs like Gemini or GPT-4 can be expensive, especially at scale. Consider your budget when selecting a model.\n* **Data Privacy:** Be aware of data privacy concerns when collecting and using user data.\n* **Safety and Bias:** Implement safeguards to mitigate harmful outputs or biases in your chatbot's responses.\n\nRemember, the development of a successful chat assistant involves a combination of technical skills, careful planning, and an understanding of the underlying technology. \n" },
                    ],
                },
            ],
        });
        const result = yield chatSession.sendMessage("What is the best storage to use is it from AWS or GCP or Azure ?");
        console.log(result.response.text());
    });
}
run();
