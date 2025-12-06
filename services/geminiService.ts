import { GoogleGenAI } from "@google/genai";

const getClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeMiningConfig = async (script: string, currentHashrate: number): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      You are an expert crypto mining engineer. I am running a CPU miner with the following setup script:
      
      \`\`\`bash
      ${script}
      \`\`\`

      Current simulated hashrate: ${currentHashrate} kH/s.

      Please provide 3 short, bulleted technical recommendations to optimize this build or improve performance on an ARM Linux architecture. 
      Focus on flags for './build-linux-arm.sh' or 'cpuminer' runtime arguments.
      Keep it technical and concise.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No insights available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to connect to AI optimization node. Please check API Key.";
  }
};
