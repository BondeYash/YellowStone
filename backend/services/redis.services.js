import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();


const redisClient = new Redis({
  host: 'redis-13319.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
  port: 13319,
  password: 'd10CZSOvbatDgiUaoRS47jMsITLa5MoW',
  // ⚠️ Don't include tls: {} here
});


redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.log("Connecting to Redis URL:", process.env.REDIS_URL);

  console.error('Redis connection error:', err);
});

export default redisClient;