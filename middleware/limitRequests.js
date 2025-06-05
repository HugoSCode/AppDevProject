import rateLimit from 'express-rate-limit';

const reqLimit= rateLimit({
        windowMs: 2 * 60 * 1000, // 2 Mins 
        max: 20,                 // limit each IP to 20 requests per 2Mins
        message: "Too many requests, please try again later.",
});

export { reqLimit };