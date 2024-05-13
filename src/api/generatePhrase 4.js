// api/generatePhrase.js
import { Configuration, OpenAIApi } from "@openai/client";

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Generate a subtle and interesting 4-word phrase for a story game.",
      max_tokens: 60,
    });

    const phrase = response.data.choices[0].text.trim();
    res.status(200).json({ phrase });
  } catch (error) {
    console.error("Error generating phrase:", error);
    res.status(500).json({ error: "Failed to generate phrase" });
  }
}