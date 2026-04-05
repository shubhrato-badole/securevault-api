import rateLimit from "express-rate-limit";


   export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    handler : (req, res) => 
        res.status(429).json({
            success: false,                 
    message: "Too many requests from this IP, please try again later."
        })
});
