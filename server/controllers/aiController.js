import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";

const hasGemini = Boolean(process.env.GEMINI_API_KEY);
const AI = hasGemini ? new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
}) : null;

export const generateArticle = async (req, res) => {
    try {
        const userId = req.userId;
        const { prompt, length = 500 } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Validate required fields
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Prompt is required and must be a non-empty string" });
        }

        if (plan !== 'premium' && free_usage >= 10) {
            return res.status(429).json({ success: false, message: "Limit reached. Upgrade to continue." });
        }
        let content = `Mock article for: ${prompt}\n\nThis is a placeholder because GEMINI_API_KEY is not configured.`;
        if (hasGemini) {
            const response = await AI.chat.completions.create({
                model: "gemini-2.0-flash",
                messages: [
                    { role: "user", content: prompt },
                ],
                temperature: 0.7,
                max_tokens: length,
            });
            content = response.choices[0].message.content;
        }

        try {
            await sql` INSERT INTO creations (user_id, prompt, content, type) 
            VALUES (${userId}, ${prompt}, ${content}, 'article')`;
        } catch (dbErr) {
            console.error('DB Insert Error (generateArticle):', dbErr.message);
        }

        if (plan !== 'premium') {
            try {
                await clerkClient.users.updateUser(userId, {
                    privateMetadata: { free_usage: free_usage + 1 }
                });
            } catch (clerkErr) {
                console.error('Clerk Update Error (generateArticle):', clerkErr.message);
            }
        }

        res.json({ success: true, content })

    } catch (error) {
        console.error('Generate Article Error:', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to generate article' });
    }

}

export const generateBlogTitles = async (req, res) => {
    try {
        const userId = req.userId;
        const { prompt, count = 5 } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Validate required fields
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Prompt is required and must be a non-empty string" });
        }

        if (plan !== 'premium' && free_usage >= 10) {
            return res.status(429).json({ success: false, message: "Limit reached. Upgrade to continue." });
        }

        let titles = [
            `Mock: ${prompt} - Idea 1`,
            `Mock: ${prompt} - Idea 2`,
            `Mock: ${prompt} - Idea 3`,
            `Mock: ${prompt} - Idea 4`,
            `Mock: ${prompt} - Idea 5`,
        ];
        if (hasGemini) {
            const response = await AI.chat.completions.create({
                model: "gemini-2.0-flash",
                messages: [
                    { role: "system", content: `Generate ${count} catchy, SEO-friendly blog title suggestions for the given topic. Each title should be engaging and click-worthy. Return only the titles, one per line.` },
                    { role: "user", content: prompt },
                ],
                temperature: 0.8,
                max_tokens: 500,
            });
            const content = response.choices[0].message.content;
            titles = content.split('\n').filter(title => title.trim());
        }
        
        try {
            await sql` INSERT INTO creations (user_id, prompt, content, type) 
            VALUES (${userId}, ${prompt}, ${titles.join('\n')}, 'blog_titles')`;
        } catch (dbErr) {
            console.error('DB Insert Error (generateBlogTitles):', dbErr.message);
        }

        if (plan !== 'premium') {
            try {
                await clerkClient.users.updateUser(userId, {
                    privateMetadata: { free_usage: free_usage + 1 }
                });
            } catch (clerkErr) {
                console.error('Clerk Update Error (generateBlogTitles):', clerkErr.message);
            }
        }

        res.json({ success: true, titles })

    } catch (error) {
        console.error('Generate Blog Titles Error:', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to generate blog titles' });
    }
}

export const generateImages = async (req, res) => {
    try {
        const userId = req.userId;
        const { prompt, style = "realistic", count = 1 } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Validate required fields
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Prompt is required and must be a non-empty string" });
        }

        if (plan !== 'premium' && free_usage >= 10) {
            return res.status(429).json({ success: false, message: "Limit reached. Upgrade to continue." });
        }

        // Note: This is a placeholder. You'll need to integrate with an actual image generation API
        // like DALL-E, Midjourney, or Stable Diffusion
        const mockImages = Array.from({ length: count }, (_, i) => ({
            id: Date.now() + i,
            url: `https://picsum.photos/512/512?random=${Date.now() + i}`,
            prompt: prompt
        }));
        
        try {
            await sql` INSERT INTO creations (user_id, prompt, content, type) 
            VALUES (${userId}, ${prompt}, ${JSON.stringify(mockImages)}, 'images')`;
        } catch (dbErr) {
            console.error('DB Insert Error (generateImages):', dbErr.message);
        }

        if (plan !== 'premium') {
            try {
                await clerkClient.users.updateUser(userId, {
                    privateMetadata: { free_usage: free_usage + 1 }
                });
            } catch (clerkErr) {
                console.error('Clerk Update Error (generateImages):', clerkErr.message);
            }
        }

        res.json({ success: true, images: mockImages })

    } catch (error) {
        console.error('Generate Images Error:', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to generate images' });
    }
}

export const reviewResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeText } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Validate required fields
        if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Resume text is required and must be a non-empty string" });
        }

        if (plan !== 'premium' && free_usage >= 10) {
            return res.status(429).json({ success: false, message: "Limit reached. Upgrade to continue." });
        }

        let content = `Mock review for resume. Provide constructive feedback for:\n\n${resumeText}`;
        if (hasGemini) {
            const response = await AI.chat.completions.create({
                model: "gemini-2.0-flash",
                messages: [
                    { role: "system", content: "You are an expert resume reviewer. Analyze the provided resume and give constructive feedback on: 1) Content quality, 2) Formatting, 3) Keywords optimization, 4) ATS compatibility, 5) Overall suggestions for improvement. Be specific and actionable." },
                    { role: "user", content: `Please review this resume:\n\n${resumeText}` },
                ],
                temperature: 0.3,
                max_tokens: 1500,
            });
            content = response.choices[0].message.content;
        }
        
        try {
            await sql` INSERT INTO creations (user_id, prompt, content, type) 
            VALUES (${userId}, ${'Resume Review'}, ${content}, 'resume_review')`;
        } catch (dbErr) {
            console.error('DB Insert Error (reviewResume):', dbErr.message);
        }

        if (plan !== 'premium') {
            try {
                await clerkClient.users.updateUser(userId, {
                    privateMetadata: { free_usage: free_usage + 1 }
                });
            } catch (clerkErr) {
                console.error('Clerk Update Error (reviewResume):', clerkErr.message);
            }
        }

        res.json({ success: true, review: content })

    } catch (error) {
        console.error('Review Resume Error:', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to review resume' });
    }
}

export const removeBackground = async (req, res) => {
    try {
        const userId = req.userId;
        const { imageUrl } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Validate required fields
        if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Image URL is required and must be a non-empty string" });
        }

        if (plan !== 'premium' && free_usage >= 10) {
            return res.status(429).json({ success: false, message: "Limit reached. Upgrade to continue." });
        }

        // Note: This is a placeholder. You'll need to integrate with an actual background removal API
        // like Remove.bg, Clipdrop, or similar service
        const processedImageUrl = `https://via.placeholder.com/600x400/00ff00/ffffff?text=Background+Removed`;
        
        try {
            await sql` INSERT INTO creations (user_id, prompt, content, type) 
            VALUES (${userId}, ${'Background Removal'}, ${processedImageUrl}, 'background_removal')`;
        } catch (dbErr) {
            console.error('DB Insert Error (removeBackground):', dbErr.message);
        }

        if (plan !== 'premium') {
            try {
                await clerkClient.users.updateUser(userId, {
                    privateMetadata: { free_usage: free_usage + 1 }
                });
            } catch (clerkErr) {
                console.error('Clerk Update Error (removeBackground):', clerkErr.message);
            }
        }

        res.json({ success: true, processedImageUrl })

    } catch (error) {
        console.error('Remove Background Error:', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to remove background' });
    }
}

export const removeObject = async (req, res) => {
    try {
        const userId = req.userId;
        const { imageUrl, selectedAreas } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Validate required fields
        if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Image URL is required and must be a non-empty string" });
        }

        if (plan !== 'premium' && free_usage >= 10) {
            return res.status(429).json({ success: false, message: "Limit reached. Upgrade to continue." });
        }

        // Note: This is a placeholder. You'll need to integrate with an actual object removal API
        // like Adobe Creative SDK, Remove.bg, or similar service
        const processedImageUrl = `https://via.placeholder.com/600x400/ff0000/ffffff?text=Object+Removed`;
        
        try {
            await sql` INSERT INTO creations (user_id, prompt, content, type) 
            VALUES (${userId}, ${'Object Removal'}, ${processedImageUrl}, 'object_removal')`;
        } catch (dbErr) {
            console.error('DB Insert Error (removeObject):', dbErr.message);
        }

        if (plan !== 'premium') {
            try {
                await clerkClient.users.updateUser(userId, {
                    privateMetadata: { free_usage: free_usage + 1 }
                });
            } catch (clerkErr) {
                console.error('Clerk Update Error (removeObject):', clerkErr.message);
            }
        }

        res.json({ success: true, processedImageUrl })

    } catch (error) {
        console.error('Remove Object Error:', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to remove object' });
    }
}