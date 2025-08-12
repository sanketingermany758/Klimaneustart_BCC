import { GoogleGenAI, Type } from "@google/genai";

// In a web environment (like Vite or Create React App), environment variables
// are typically exposed on `process.env` by the build tool.
const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.warn("API_KEY not found in environment variables. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'MISSING_API_KEY' });

/**
 * Analyzes the observer's reflection using the Gemini API.
 * @param reflectionText The text written by the observer.
 * @returns A concise, one-sentence summary of the reflection.
 */
export const generateGeminiAnalysis = async (reflectionText: string): Promise<string> => {
    if (!apiKey) {
        // Return a mock response if API key is not available
        return new Promise(resolve => setTimeout(() => resolve("This is a mock AI insight because the API key is not configured."), 1000));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `The following is a reflection from an observer of a climate conversation in Berlin. Summarize the key takeaway in one concise sentence. Reflection: "${reflectionText}"`,
        });
        
        const summary = response.text;
        
        if (!summary) {
            throw new Error("Received an empty response from Gemini API.");
        }
        
        return summary.trim();

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate analysis from Gemini API.");
    }
};

/**
 * Generates actionable follow-up questions based on a reflection.
 * @param reflectionText The text written by the observer.
 * @returns An array of 3 suggestion strings.
 */
export const generateGeminiSuggestions = async (reflectionText: string): Promise<string[]> => {
    if (!apiKey) {
        // Return mock suggestions if no API key
        return new Promise(resolve => setTimeout(() => resolve([
            "What specific local policy could address this?",
            "How could this sentiment be turned into a community project?",
            "Who are the key stakeholders to involve next?"
        ]), 1000));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following reflection from a climate conversation observer in Berlin, generate exactly 3 short, actionable follow-up questions or thought-starters. These should inspire deeper thinking or next steps. Reflection: "${reflectionText}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        suggestions: {
                            type: Type.ARRAY,
                            description: "A list of three actionable follow-up questions or suggestions.",
                            items: {
                                type: Type.STRING
                            }
                        }
                    },
                    required: ['suggestions']
                }
            }
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (!result.suggestions || !Array.isArray(result.suggestions)) {
            throw new Error("Received an invalid format for suggestions from Gemini API.");
        }

        return result.suggestions;

    } catch (error) {
        console.error("Error calling Gemini API for suggestions:", error);
        throw new Error("Failed to generate suggestions from Gemini API.");
    }
};
