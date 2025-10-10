import express from "express";
import { auth } from "../middlewares/auth.js";
import { 
    generateArticle, 
    generateBlogTitles, 
    generateImages, 
    reviewResume,
    removeBackground,
    removeObject
} from "../controllers/aiController.js";

const aiRouter = express.Router();

// Simple index to verify router mount
aiRouter.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'AI API is live',
        endpoints: [
            'POST /api/ai/generate-article',
            'POST /api/ai/generate-blog-titles',
            'POST /api/ai/generate-images',
            'POST /api/ai/review-resume',
            'POST /api/ai/remove-background',
            'POST /api/ai/remove-object'
        ]
    })
})

aiRouter.post('/generate-article', auth, generateArticle)
aiRouter.post('/generate-blog-titles', auth, generateBlogTitles)
aiRouter.post('/generate-images', auth, generateImages)
aiRouter.post('/review-resume', auth, reviewResume)
aiRouter.post('/remove-background', auth, removeBackground)
aiRouter.post('/remove-object', auth, removeObject)

export { aiRouter }