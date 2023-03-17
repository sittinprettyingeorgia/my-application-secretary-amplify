const { dynamo } = require('../database-factory');

//TODO: current implementation utilizes dynamoy cache until we can link redis
class RateLimiter {
  defaultRateLimit;
  interval;

  constructor() {
    this.defaultRateLimit = {
      tokenCapacity: 150,
      tokenPerMin: 150 / 24 / 60, // tokens per minute
      availableTokens: 150
    };
    this.interval = null;
  }

  refillTokens(identifier) {
    const now = Date.now();
    let { tokenPerMin, tokenCapacity, lastRefillTime, availableTokens } =
      dynamo.getItem(
        `${identifier}`,
        process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME
      ) ?? {};

    if (tokenCapacity) {
      const timeElapsed = (now - lastRefillTime) / 1000 / 60; //convert to minutes
      const tokensToAdd = Math.floor(timeElapsed * tokenPerMin);
      let tokens = Math.min(availableTokens + tokensToAdd, tokenCapacity);

      dynamo.putItem(
        {
          identifier,
          tokenPerMin,
          tokenCapacity,
          availableTokens: Math.floor(tokens),
          lastRefillTime: now
        },
        process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME
      );
    } else {
      dynamo.putItem(
        { ...this.defaultRateLimit, lastRefillTime: now, identifier },
        process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME
      );
    }
  }

  // interval is applied to all users the same.
  async #setInterval(identifier, interval = 60000) {
    //every minute it replenishes
    this.interval = setInterval(
      async () => this.refillTokens(identifier),
      interval
    );
  }

  async clearInterval() {
    this.clearInterval(this.interval);
  }

  async rateLimit(identifier) {
    try {
      await this.#setInterval(identifier);
      let { availableTokens, ...r } =
        (await dynamo.getItem(
          identifier,
          process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME
        )) ?? {};

      if (availableTokens == null) {
        //user has never accessed this and needs a bucket created.
        this.refillTokens(identifier);
      } else {
        let count = parseInt(availableTokens, 10) || 0;

        if (count <= 0) {
          return { statusCode: 429 };
        }

        await dynamo.putItem(
          { availableTokens: --count, ...r },
          process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME
        );
      }

      return { statusCode: 200, availableTokens };
    } catch (e) {
      console.log(e);
      return { statusCode: 500 };
    }
  }
}

const rateLimiter = new RateLimiter();
module.exports.rateLimiter = rateLimiter;
