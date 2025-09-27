

import { GoogleGenAI } from "@google/genai";
import { Task, PortfolioItem } from '../types';

// Per coding guidelines, the API key is sourced directly from environment variables
// and is assumed to be available and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAITaskFeedback = async (task: Task): Promise<string> => {
  try {
    const prompt = `
      You are an AI mentor for a young creative freelancer on the 'SkillUp & Earn' platform.
      Provide encouraging but constructive feedback for a completed task. Be specific and actionable.
      The user just completed the following task:
      - Title: "${task.title}"
      - Description: "${task.description}"
      - Category: "${task.category}"
      
      Provide feedback assuming their submission was good but has room for improvement. 
      Focus on 1-2 key principles related to the task category. 
      For example, for Logo Design, talk about scalability or color psychology. For Social Media, talk about engagement or visual hierarchy.
      Format your response in markdown. Start with a positive opening, then a section for "Strengths" and a section for "Areas for Improvement" with 2 bullet points each.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating AI task feedback:", error);
    return "There was an error getting feedback from the AI mentor. Please try again later.";
  }
};

export const getAIPortfolioAdvice = async (portfolioItems: PortfolioItem[]): Promise<string> => {
  try {
    const portfolioList = portfolioItems.map(item => `- ${item.title} (${item.taskCategory})`).join('\n');
    const prompt = `
      You are an AI career coach for 'SkillUp & Earn', specializing in creative portfolios for young freelancers.
      Analyze this user's portfolio and provide actionable advice to make it stronger.
      
      Current Portfolio Projects:
      ${portfolioList}
      
      Based on this, provide advice covering these three areas:
      1.  **Portfolio Presentation:** Suggest one key improvement for how they present their work (e.g., adding case studies, showing process work).
      2.  **Skill Diversification:** Recommend one new type of project they should take on to diversify their skills and appeal to more clients.
      3.  **Project Descriptions:** Give a general tip on how to write more compelling project descriptions.
      
      Format the response in markdown with clear headings for each point. Be motivational and clear.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating AI portfolio advice:", error);
    return "There was an error getting advice from the AI coach. Please try again later.";
  }
};


export const generateAIVideo = async (prompt: string): Promise<string | null> => {
    try {
        console.log("Starting video generation...");
        let operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: prompt,
            config: {
                numberOfVideos: 1
            }
        });

        console.log("Polling for video generation status...");
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds before checking again
            operation = await ai.operations.getVideosOperation({ operation: operation });
            console.log("Current operation status:", operation.done);
        }

        console.log("Video generation complete.");
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        
        if (downloadLink) {
            console.log("Fetching video from download link...");
            // As per guidelines, append the API key when fetching from the download link.
            const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            if (!videoResponse.ok) {
                throw new Error(`Failed to fetch video: ${videoResponse.statusText}`);
            }
            const videoBlob = await videoResponse.blob();
            const videoUrl = URL.createObjectURL(videoBlob);
            console.log("Video URL created:", videoUrl);
            return videoUrl;
        }

        return null;
    } catch (error) {
        console.error("Error generating AI video:", error);
        return null;
    }
};