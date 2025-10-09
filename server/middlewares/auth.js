import { clerkClient } from "@clerk/express";

// Middleware to check userId and hasPremiumPlan
export const auth = async (req, res, next) => {
    let hasPremiumPlan; // Declare outside of try to keep it in scope

    try {
        const { userId, has } = await req.auth();
        // hasPremiumPlan is assigned here
        hasPremiumPlan = await has({ plan: 'premium' });

        const user = await clerkClient.users.getUser(userId);

        if (!hasPremiumPlan && user.privateMetadata?.free_usage > 0) {
            // Case 1: Free user with remaining free usage
            req.free_usage = user.privateMetadata.free_usage;
        } else {
            // Case 2: Premium user OR free user with 0 remaining usage
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0 // Reset usage on server
                }
            });
            req.free_usage = 0; // Set usage to 0 on request object
        }

        // Set the user's plan and proceed to the next middleware/route handler
        req.plan = hasPremiumPlan ? 'premium' : 'free';
        next();

    } catch (error) {
        // Handle any errors that occurred during auth or fetching user data
        console.error("Authentication middleware error:", error);

        // Terminate the request or send an error response
        // For security, you might just send a generic error
        res.status(401).send("Unauthorized or Internal Server Error");
    }
}