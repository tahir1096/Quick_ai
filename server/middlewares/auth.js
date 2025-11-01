import { clerkClient } from "@clerk/express";

// Middleware to attach user context using Clerk and manage free usage
export const auth = async (req, res, next) => {
    try {
        const authContext = req.auth;
        let userId = authContext?.userId;

        // Development fallback: allow requests without Clerk in non-production
        const isProduction = process.env.NODE_ENV === 'production';
        if (!userId && !isProduction) {
            req.userId = 'dev-user';
            req.plan = 'free';
            req.free_usage = 0;
            return next();
        }

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = await clerkClient.users.getUser(userId);

        const planFromPublic = user.publicMetadata?.plan;
        const planFromPrivate = user.privateMetadata?.plan;
        const plan = (planFromPublic === 'premium' || planFromPrivate === 'premium') ? 'premium' : 'free';

        const existingFreeUsage = Number(user.privateMetadata?.free_usage) || 0;

        // Attach to request for controllers
        req.userId = userId;
        req.plan = plan;
        req.free_usage = plan === 'premium' ? 0 : existingFreeUsage;

        // Initialize free_usage if not present for free users
        if (plan !== 'premium' && user.privateMetadata?.free_usage === undefined) {
            try {
                await clerkClient.users.updateUser(userId, {
                    privateMetadata: { free_usage: 0 }
                });
            } catch (updateErr) {
                console.error('Error initializing free_usage for user:', updateErr.message);
            }
        }

        next();
    } catch (error) {
        console.error("Authentication middleware error:", error);
        res.status(401).json({ success: false, message: "Unauthorized or Internal Server Error" });
    }
}