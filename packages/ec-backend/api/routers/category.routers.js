const router = require('express').Router();
const {
  findCategories,
  findCategoryById,
  createCategory,
  updateCategoryById,
  countCategories,
  deleteCategoryById,
} = require('../controllers/category.controllers');
const authentication = require('../middleware/authentication');
const permission = require('../middleware/permission');

router.get('/count', countCategories);
router.delete('/:id', authentication, permission, deleteCategoryById);
router.put('/:id', authentication, permission, updateCategoryById);
router.get('/:id', findCategoryById);
router.get('/', findCategories);
router.post('/', authentication, permission, createCategory);

module.exports = router;
