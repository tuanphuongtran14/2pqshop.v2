const userRouter = require('./user.routers');
const productRouter = require('./product.routers');
const tagRouter = require('./tag.routers');
const categoryRouter = require('./category.routers');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/products', productRouter);
  app.use('/tags', tagRouter);
  app.use('/categories', categoryRouter);
};
