const router = require('express').Router();
const {
  findProducts,
  findProductById,
  findProductBySlug,
  createProduct,
  updateProductById,
  searchProducts,
  countProducts,
  deleteProductById,
} = require('../controllers/product.controllers');
const authentication = require('../middleware/authentication');
const permission = require('../middleware/permission');

router.get('/search', searchProducts);
router.get('/count', countProducts);
router.get('/slug/:slug', findProductBySlug);
router.delete('/:id', deleteProductById);
router.put('/:id', updateProductById);
router.get('/:id', findProductById);
router.get('/', findProducts);
router.post('/', authentication, permission, createProduct);

module.exports = router;
