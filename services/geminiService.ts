
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export async function analyzeResume(resumeText: string, jobDescription: string): Promise<AnalysisResult> {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Configuration manquante : La clé API n'est pas définie dans l'environnement.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    You are a world-class Senior Career Strategist and ATS (Applicant Tracking System) Forensic Expert.
    Your specialty is transforming the resumes of highly experienced professionals (40+) to neutralize age bias while amplifying their high-level ROI.
    
    FORENSIC AGE NEUTRALIZATION PROTOCOL:
    1. DE-DATING: Remove all graduation years. Remove dates for roles older than 15 years.
    2. MODERNIZATION: Replace archaic terminology (e.g., replace "Personnel management" with "Talent Strategy").
    3. TECH-STACK UPDATE: Explicitly highlight modern toolsets (AI tools, SaaS, Cloud, Agile).
    4. NARRATIVE SHIFT: Focus on "Scale of impact" (future value) rather than "Years of experience" (history).
    
    OUTPUT STRUCTURE (JSON):
    - optimizedResume: The rewritten resume in professional Markdown.
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
        thinkingConfig: { thinkingBudget: 4000 }, // Permet à l'IA d'analyser les biais avant de rédiger
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
    if (!text) throw new Error("Le modèle n'a pas retourné de texte.");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("API_KEY_INVALID")) {
      throw new Error("Clé API invalide. Veuillez vérifier votre configuration dans Vercel.");
    }
    throw new Error("L'IA n'a pas pu traiter votre CV. Vérifiez la longueur du texte et réessayez.");
  }
}
