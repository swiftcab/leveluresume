
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export async function analyzeResume(resumeText: string, jobDescription: string): Promise<AnalysisResult> {
  // Initialisation sécurisée avec la clé d'environnement
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a world-class Senior Career Strategist and ATS (Applicant Tracking System) Forensic Expert.
    Your specialty is transforming the resumes of highly experienced professionals (40+) to neutralize age bias while amplifying their high-level ROI.
    
    FORENSIC AGE NEUTRALIZATION PROTOCOL:
    1. DE-DATING: Remove all graduation years. Remove dates for roles older than 15 years.
    2. MODERNIZATION: Replace archaic terminology (e.g., replace "Electronic Mail" with "Digital Communication", "Personnel management" with "Talent Strategy").
    3. TECH-STACK UPDATE: Explicitly highlight modern toolsets (AI tools, SaaS, Cloud, Agile) even if inferred from experience.
    4. NARRATIVE SHIFT: Move away from "Years of experience" (history) towards "Scale of impact" (future value). Use "Proven leader in..." instead of "25 years in...".
    
    OUTPUT STRUCTURE (JSON):
    - optimizedResume: The rewritten resume in professional Markdown.
    - analysis: A 2-sentence summary of the strategic pivot made.
    - ageNeutralizationTips: 3 highly specific tips for this specific candidate to avoid bias in interviews.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Version Pro pour une intelligence supérieure sur les nuances de carrière
      contents: `RESUME:\n${resumeText}\n\nTARGET JOB:\n${jobDescription}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
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

    return JSON.parse(response.text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Une erreur technique est survenue lors de l'analyse. Veuillez réessayer.");
  }
}
