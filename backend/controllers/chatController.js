import axios from 'axios';
import Tour from '../models/Tour.js'; // Unga Tour model-ai import pannunga

export const chatWithAI = async (req, res) => {
    const { userMessage } = req.body;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    try {
        console.log("--- SMART DB CHAT START ---");

        // 1. Database-la irundhu available tours-ai edukkurom
        const tours = await Tour.find({}).limit(5); // Top 5 tours edukkum
        
        // 2. Tours details-ai oru simple string-ah mathuroam
        const tourData = tours.map(t => 
            `Name: ${t.title}, Price: $${t.price}, City: ${t.city}`
        ).join(" | ");

        // 3. AI-kku intha tours details-ai "Context"-ah kudukkurom
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: `You are a travel assistant for 'Travel World'. 
                        Current available tours in our database: ${tourData}. 
                        If user asks about available tours or suggestions, use this data. 
                        Keep answers short and friendly.` 
                    },
                    { role: "user", content: userMessage }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${GROQ_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const aiReply = response.data.choices[0].message.content;
        console.log("AI Replied with DB Data! ✅");

        res.status(200).json({ success: true, message: aiReply });

    } catch (error) {
        console.error("SMART CHAT ERROR:", error.message);
        res.status(500).json({ success: false, message: "AI is resting 😴" });
    }
};