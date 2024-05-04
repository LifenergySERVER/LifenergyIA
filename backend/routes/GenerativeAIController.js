const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-pro";
  const API_KEY = "AIzaSyDtZ7cWyYF4foBnY0fXDRFFcAi4ZtM67xI";
  
  async function run(data) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      // {
      //   category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      //   threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      // },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      // {
      //   category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      //   threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      // },
    ];
  
    const parts = [
      { text: data },
    ];
 
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        safetySettings,
      });
  
    const response = result.response.text();   
    return response; // Return the generated text
  }
  
  module.exports = {
    run,
  };
  