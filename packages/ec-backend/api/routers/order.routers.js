const router = require('express').Router();
const {
  createOrder,
  findOrders,
  findOrderById,
  updateStatusOrder,
} = require('../controllers/order.controllers');

router.put('/update-status', updateStatusOrder);
router.get('/:id', findOrderById);
router.get('/', findOrders);
router.post('/', createOrder);

module.exports = router;
