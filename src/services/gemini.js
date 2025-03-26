// chat-app/src/services/gemini.js
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const apiKey = process.env.REACT_APP_GEMINI_API_KEYS;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

let chatSession;

export async function sendMessageToGemini(input) {
  if (!chatSession)
  {
      chatSession = model.startChat({
          generationConfig,
          safetySettings,
          history: [],
      });
  }
  console.log("API Key:", process.env.REACT_APP_GEMINI_API_KEY);
  try {
      const result = await chatSession.sendMessage(input);
      return result.response.text();
  } catch (error) {
      console.error("Gemini API Error:", error);
      return "Sorry, I encountered an error.";
  }
}