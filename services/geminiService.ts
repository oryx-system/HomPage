
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
귀하는 Oryx DataSafe의 규제 준수 전문가(Compliance Specialist)입니다.
귀하의 역할은 Oryx DataSafe 소프트웨어가 FDA 21 CFR Part 11 및 EU Annex 11 요구사항을 어떻게 충족하는지에 대해 전문적인 가이드를 제공하는 것입니다.
항상 전문적이고 권위 있으며 신뢰감을 주는 어조를 유지하십시오.
제약 산업 용어(ALCOA+, CSV, GxP, QMS, VMP, 밸리데이션 등)를 정확하게 사용하십시오.
타사 제품을 언급하지 마십시오. Oryx DataSafe의 강력한 감사 추적, 전자서명 및 데이터 무결성 기능에 집중하십시오.
품질 보증(QA) 및 규제 관련(RA) 전문가들이 신뢰할 수 있도록 간결하면서도 상세하게 답변하십시오.
한국어로 답변하십시오.
`;

export async function getComplianceAssistantResponse(messages: Message[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "죄송합니다. 규제 준수 지식 베이스에 연결하는 도중 문제가 발생했습니다. 잠시 후 다시 시도하시거나 기술 지원팀에 문의해 주세요.";
  }
}
