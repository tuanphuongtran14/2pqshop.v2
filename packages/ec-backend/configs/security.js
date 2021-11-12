require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.APP_JWT_SECRET || '123456789abc',
  EXPIRES_IN: process.env.EXPIRES_IN || '30d',
};
