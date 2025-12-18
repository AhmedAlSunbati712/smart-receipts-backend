import gpt from "../config/gpt.ts";
import { systemPrompt } from "../constants/prompts.ts";

const extractReceiptInfo = async (rawText: string) => {
    try {
        const userPrompt = {
            role: "user" as const,
            content: rawText
        };
        const completeion = await gpt.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [systemPrompt, userPrompt],
        });
        const responseText = completeion.choices[0].message.content;
        const receipt = JSON.parse(responseText!);
        return receipt;
    } catch (error) {
        console.error("[ERROR] extractReceiptInfo service: ", rawText);
        throw error;
    }
}

const gptService = {
    extractReceiptInfo,
}

export default gptService;