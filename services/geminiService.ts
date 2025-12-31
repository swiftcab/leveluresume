
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export async function analyzeResume(resumeText: string, jobDescription: string): Promise<AnalysisResult> {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Configuration Missing: API_KEY environment variable is not set. Please add it to your Vercel project settings.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    You are a world-class Senior Career Strategist and ATS (Applicant Tracking System) Forensic Expert.
    Your specialty is transforming the resumes of highly experienced professionals (40+) to neutralize age bias while amplifying their high-level ROI.
    
    FORENSIC AGE NEUTRALIZATION PROTOCOL:
    1. DE-DATING: Remove all graduation years. Remove dates for roles older than 15 years.
    2. MODERNIZATION: Replace archaic terminology with modern, high-value equivalents.
    3. TECH-STACK UPDATE: Explicitly highlight modern toolsets (AI tools, SaaS, Cloud, Agile).
    4. NARRATIVE SHIFT: Focus on "Scale of impact" (future value) rather than "Years of experience" (history).
    
    TONE AND STYLE:
    - Direct Response Copywriting (Hormozi/Brunson style).
    - Punchy, high-stakes, ROI-driven bullet points.
    - No fluff. No AI-style formatting (no bullet point intros like "Sure, here is...").
    
    OUTPUT STRUCTURE (JSON):
    - optimizedResume: The rewritten master manuscript in professional Markdown.
    - analysis: A 2-sentence summary of the strategic pivot made.
    - ageNeutralizationTips: 3 highly specific tips for this specific candidate.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: `RESUME:\n${resumeText}\n\nTARGET JOB:\n${jobDescription}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 4000 },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimizedResume: { type: Type.STRING },
            analysis: { type: Type.STRING },
            ageNeutralizationTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["optimizedResume", "analysis", "ageNeutralizationTips"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("The model returned an empty response.");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("API_KEY_INVALID")) {
      throw new Error("Invalid API Key. Please update your project settings in Vercel.");
    }
    throw new Error("The intelligence core could not process your resume. Please check the text length and try again.");
  }
}
