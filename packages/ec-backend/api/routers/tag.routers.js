const router = require('express').Router();
const {
  findTags,
  findTagById,
  createTag,
  updateTagById,
  countTags,
  deleteTagById,
} = require('../controllers/product.controllers');
const authentication = require('../middlewares/authentication');
const permission = require('../middlewares/permission');

router.get('/count', countTags);
router.delete('/:id', authentication, permission, deleteTagById);
router.put('/:id', authentication, permission, updateTagById);
router.get('/:id', findTagById);
router.get('/', findTags);
router.post('/', authentication, permission, createTag);

module.exports = router;
