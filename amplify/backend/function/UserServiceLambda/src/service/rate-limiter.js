//TODO: current implementation utilizes dynamodb cache until we can link redis
const { dynamo,handleError } = require('../util');
const log = require('loglevel');

log.setLevel('error');
//TODO: doesnt work anymore. needs to be fixed

const rateLimitTableName = process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME;

class RateLimiter {
  defaultRateLimit;
  interval;

  constructor() {
    this.defaultRateLimit = {
      tokenCapacity: 150,
      tokenPerMin: 150 / 24 / 60,
      availableTokens: 150
    };
    this.interval = null;
  }

  refillTokens(identifier) {
    try {
      const now = Date.now();
      let { tokenPerMin, tokenCapacity, lastRefillTime, availableTokens } =
        dynamo.getItem(
          `${identifier}`,
          rateLimitTableName
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
          rateLimitTableName
        );
      } else {
        dynamo.putItem(
          { ...this.defaultRateLimit, lastRefillTime: now, identifier },
          rateLimitTableName
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
        () => this.refillTokens(identifier),
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
        (await dynamo.getItem(
          identifier,
          rateLimitTableName
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
          rateLimitTableName
        );
      }

      return { statusCode: 200, availableTokens };
    } catch (e) {
      handleError(e, 'rateLimit error');
      return { statusCode: 500 };
    }
  }
}

const rateLimiter = new RateLimiter();
module.exports.rateLimiter = rateLimiter;
