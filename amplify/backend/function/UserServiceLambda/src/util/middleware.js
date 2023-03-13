const Data = require('../util/data');

module.exports.getUser = async(req, res, next) => {
  const accessToken = req.get('access_token');
  if(accessToken){
    req.currentAppUser = await Data.query('getUser', req.get('access_token'));
  }

  next();
};

module.exports.enableCors = async(_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};