// const redis = require('redis');
// //TODO: re add redis later for rate limiting.

// const getRedisClient = () => {
//     let redisClient;

//     redisClient = redis.createClient({
//         socket:{
//             host: `${process.env.REDIS_ENDPOINT}`,
//             port: `${process.env.REDIS_PORT}`,
//         }
//     });

//     return redisClient;
// };