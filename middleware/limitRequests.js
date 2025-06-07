import rateLimit from 'express-rate-limit';

const getReqLimit= rateLimit({
        windowMs: 2 * 60 * 1000, // 2 Mins 
        max: 20,                 // limit each IP to 20 requests per 2Mins
        message: "You have exceeded the number of requests: 20. Please try again in 2 minutes.",
});

const createReqLimit= rateLimit({
        windowMs: 1 * 60 * 1000, // 1 Mins 
        max: 10,                // limit each IP to 10 requests per 1Mins
        message: "You have exceeded the number of requests: 10. Please try again in 1 minute.",
});

export { getReqLimit, createReqLimit };