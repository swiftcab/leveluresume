
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export async function extractTextFromDocument(base64Data: string, mimeType: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const dataOnly = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: dataOnly,
                mimeType: mimeType
              }
            },
            {
              text: "ACT AS A FORENSIC DOCUMENT PARSER. Extract every single word, date, and detail from this resume document. Maintain the structural layout. Return ONLY text content."
            }
          ]
        }
      ]
    });
    const text = response.text;
    if (!text) throw new Error("Empty extraction.");
    return text.trim();
  } catch (error: any) {
    throw new Error(`Extraction failed: ${error.message}`);
  }
}

export async function analyzeResume(resumeText: string, jobDescription: string, resumeImageBase64?: string): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a 2026 Neural ATS Forensic Expert. 
    Your mission is to calculate a 'Market Survival Score' (0-100) and then optimize the resume.
    
    SCORING LOGIC (0-100):
    - 0-30: Critical Failure (Too many age triggers, outdated tech, biographical layout).
    - 31-60: High Risk (Moderate age triggers, generic results).
    - 61-90: Competitive (Modern terminology, but lacks semantic gravity).
    - 91-100: Elite (Neural-optimized, future-focused).
    
    OUTPUT STRUCTURE (JSON):
    - score: Integer (0-100).
    - marketRelevance: Short label (e.g., "ALGORITHMIC FAILURE", "CRITICAL BIAS DETECTED").
    - optimizedResume: Markdown manuscript.
    - analysis: 1-2 sentence strategic pivot.
    - ageNeutralizationTips: 3 specific tactical changes.
  `;

  try {
    const contents: any[] = [];
    if (resumeImageBase64) {
      const dataOnly = resumeImageBase64.includes(',') ? resumeImageBase64.split(',')[1] : resumeImageBase64;
      contents.push({ inlineData: { data: dataOnly, mimeType: 'image/jpeg' } });
    }
    contents.push({ text: `RESUME: ${resumeText}\n\nTARGET: ${jobDescription}` });

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: { parts: contents },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            marketRelevance: { type: Type.STRING },
            optimizedResume: { type: Type.STRING },
            analysis: { type: Type.STRING },
            ageNeutralizationTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["score", "marketRelevance", "optimizedResume", "analysis", "ageNeutralizationTips"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Model timeout.");
    return JSON.parse(text) as AnalysisResult;
  } catch (error: any) {
    throw new Error("Neural connection failure.");
  }
}
