//TODO: current implementation utilizes dynamoy cache until we can link redis
const { handleError } = require('./response');

class RateLimiter {
  defaultRateLimit;
  interval;
  dynamo;

  constructor(dynamo) {
    this.defaultRateLimit = {
      tokenCapacity: 150,
      tokenPerMin: 150 / 24 / 60, // tokens per minute
      availableTokens: 150
    };
    this.interval = null;
    this.dynamo = dynamo;
  }

  refillTokens(identifier) {
    try {
      const now = Date.now();
      let { tokenPerMin, tokenCapacity, lastRefillTime, availableTokens } =
        this.dynamo.getItem(
          `${identifier}`,
          process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME
        ) ?? {};

      if (tokenCapacity) {
        const timeElapsed = (now - lastRefillTime) / 1000 / 60; //convert to minutes
        const tokensToAdd = Math.floor(timeElapsed * tokenPerMin);
        let tokens = Math.min(availableTokens + tokensToAdd, tokenCapacity);

        this.dynamo.putItem(
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
        this.dynamo.putItem(
          { ...this.defaultRateLimit, lastRefillTime: now, identifier },
          process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME
        );
      }
    } catch (e) {
      handleError(e, 'refillTokens error');
    }
  }

  // interval is applied to all users the same.
  async #setInterval(identifier, interval = 60000) {
    try {
      //every minute it replenishes
      this.interval = setInterval(
        async () => this.refillTokens(identifier),
        interval
      );
    } catch (e) {
      handleError(e, 'setInterval error');
    }
  }

  async clearInterval() {
    this.clearInterval(this.interval);
  }

  async rateLimit(identifier) {
    try {
      await this.#setInterval(identifier);
      let { availableTokens, ...r } =
        (await this.dynamo.getItem(
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

        await this.dynamo.putItem(
          { availableTokens: --count, ...r },
          process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME
        );
      }

      return { statusCode: 200, availableTokens };
    } catch (e) {
      handleError(e, 'rateLimit error');
      return { statusCode: 500 };
    }
  }
}

module.exports.RateLimiter = RateLimiter;