const {dynamo} = require('../database-factory');

//TODO: current implementation utilizes aws-amplify cache until we can link redis
class RateLimiter {
    defaultRateLimit;
    currentUser;
    interval;
  
    constructor(){
      this.defaultRateLimit = {
        HOUR: 60,
        DAY: 24,
        TOKEN_BUCKET_CAPACITY: 150,
        TOKEN_PER_MIN: this.TOKEN_BUCKET_CAPACITY/this.DAY/60, // tokens per minute
        availableTokens: this.TOKEN_BUCKET_CAPACITY,
      }
      this.currentUser = null;
      this.interval = null;
    }
  
    refillTokens(identifier) {
      const now = Date.now();
      let { TOKEN_PER_MIN, TOKEN_BUCKET_CAPACITY, lastRefillTime, availableTokens } = dynamo.getItem(`${identifier}`) ?? {};
      
      if(TOKEN_BUCKET_CAPACITY){
        const timeElapsed = ((now - lastRefillTime)/ 1000/ 60); //convert to minutes
        const tokensToAdd = Math.floor(timeElapsed * TOKEN_PER_MIN);
        let tokens = Math.min(availableTokens + tokensToAdd, TOKEN_BUCKET_CAPACITY);
        lastRefillTime = now;
    
        dynamo.setItem(`${identifier}`, { TOKEN_PER_MIN, TOKEN_BUCKET_CAPACITY, availableTokens: Math.floor(tokens), lastRefillTime});
      }else {
        //TODO: should retrieve bucket info from dynamo
        // needs new default rate limit started
        dynamo.setItem(`${identifier}`, { ...this.defaultRateLimit, lastRefillTime:now});
      }
    }
  
    // interval is applied to all users the same.
    async #setInterval(identifier, interval = 60000) { //every minute it replenishes
        this.interval = setInterval(async () => this.refillTokens(identifier), interval);
    }
  
    async rateLimit(currentUser){
      try {
        //TODO: still need to memoize cognito user calls
        const identifier = currentUser.Username;
        await this.#setInterval(identifier);
  
        const {availableTokens, ...rest} = dynamo.getItem(`${identifier}tokens`, process.env.RATE_LIMIT_TABLE_NAME) ?? {};
  
        if(availableTokens == null){
          //user has never accessed this and needs a bucket created.
          this.refillTokens(identifier);
        } else {
          const count = parseInt(availableTokens, 10) || 0;
  
          console.log(count);
          if (count <= 0) {
            return { statusCode:429 };
          }
          
          dynamo.setItem(`${identifier}tokens`, {...rest, availableTokens});
        }
  
        return { statusCode: 200, availableTokens};
      } catch (e) {
        console.log(e);
        return { statusCode: 500};
      }
    }
}
  
const rateLimiter = new RateLimiter();
module.exports.rateLimiter = rateLimiter;