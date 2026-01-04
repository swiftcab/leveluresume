
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export async function analyzeResume(resumeText: string, jobDescription: string): Promise<AnalysisResult> {
  // Always initialize GoogleGenAI with a named parameter using process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
    // Using gemini-3-pro-preview for complex reasoning tasks as per task-based model selection rules
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: `RESUME:\n${resumeText}\n\nTARGET JOB:\n${jobDescription}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        // Enable thinking for higher reasoning quality on Gemini 3 series models
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

    // Directly access the .text property from GenerateContentResponse
    const text = response.text;
    if (!text) throw new Error("The model returned an empty response.");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Standardize error handling without exposing internal configuration details
    throw new Error("The intelligence core could not process your resume. Please check the text length and try again.");
  }
}
