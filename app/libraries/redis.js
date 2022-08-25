const redis = require('redis');

class RedisLibrary {
    constructor() {
        (async () => { //IIFE - Immediately Invoked Function Expression
            this.redisClient = redis.createClient();
          
            this.redisClient.on("error", console.error);
          
            await this.redisClient.connect();
        })();
    }

    setCache = (key, value) => {
        return new Promise((resolve, reject) => {
            this.redisClient.set(key, JSON.stringify(value))
            .then(() => resolve())
            .catch(reject)
        })
    }

    getCache = async (key, skip, limit) => {
        try {
            return JSON.parse(await this.redisClient.get(key))
        } catch (error) {
            console.error(error)
            return undefined
        }
    }
}

module.exports = RedisLibrary;
