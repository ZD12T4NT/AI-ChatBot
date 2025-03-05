import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    try {
        const { message } = req.body;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",  // Use GPT-3.5 instead of GPT-4
            messages: [{ role: "user", content: message }],
        });

        res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error: any) {
        console.error("OpenAI API Error:", error); // ✅ Log the error details
        res.status(500).json({ message: "Error processing request", error: error.message });
    }
}
