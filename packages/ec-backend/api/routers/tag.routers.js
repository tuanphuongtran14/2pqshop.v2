const router = require('express').Router();
const {
  findTags,
  findTagById,
  createTag,
  updateTagById,
  countTags,
  deleteTagById,
} = require('../controllers/tag.controllers');
const authentication = require('../middleware/authentication');
const permission = require('../middleware/permission');

router.get('/count', countTags);
router.delete('/:id', authentication, permission, deleteTagById);
router.put('/:id', authentication, permission, updateTagById);
router.get('/:id', findTagById);
router.get('/', findTags);
router.post('/', authentication, permission, createTag);

module.exports = router;
