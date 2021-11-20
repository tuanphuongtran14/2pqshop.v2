const validate = require('../validations/order.validations');
const handleError = require('../../utils/handleErrorResponse');
const query = require('../../utils/query');
const orderServices = require('../services/order.services');

const ORDER_MODEL_NAME = 'Order';
const populates = [
  {
    path: 'user',
    populate: {
      path: 'role',
      model: 'Role',
    },
  },
];

module.exports = {
  createOrder: async (req, res) => {
    try {
      const { error } = validate.createSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const { user } = req.state;
      const params = req.body;
      const {
        totalAmount,
        finalAmount,
        items,
        canOrder,
        id: cartId,
      } = await orderServices.getDataFromUserCart(user);
      if (!canOrder) {
        return handleError.badRequest(
          res,
          'Your cart could not order',
          'Your.cart.could.not.order',
        );
      }

      const order = await query(ORDER_MODEL_NAME)
        .create({
          user: user.id,
          ...params,
          items,
          totalAmount,
          finalAmount,
          orderDate: new Date(),
          paid: false,
          status: 'NEW',
        }, populates);
      await orderServices.updateStockQuantity('DECREASE', items);
      await query('Cart').deleteById(cartId);
      return res.status(200).json(order);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findOrdersByUser: async (req, res) => {
    try {
      const { user } = req.state;
      const orders = await query(ORDER_MODEL_NAME).findPage({ user: user.id });
      return res.status(200).json(orders);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findOrders: async (req, res) => {
    try {
      const queryParams = req.query;
      const page = await query(ORDER_MODEL_NAME).findPage(queryParams);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await query(ORDER_MODEL_NAME).findById(id);
      if (!order) {
        return handleError.notFound(
          res,
          'Order not found',
          'Order.not.found',
        );
      }

      return res.status(200).json(order);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  updateStatusOrder: async (req, res) => {
    try {
      const { error } = validate.updateStatusSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const { id, status } = req.body;
      const { user } = req.state;
      const order = await query(ORDER_MODEL_NAME).findById(id, populates);
      if (!order) {
        return handleError.notFound(
          res,
          'Order not found',
          'Order.not.found',
        );
      }

      const havePermission = orderServices.havePermissionToChangeStatus(user, order, status);
      if (!havePermission) {
        return handleError.forbidden(
          res,
          'You do not have permission',
          'You.do.not.have.permission',
        );
      }

      order.status = status;
      await order.save();

      if (status === 'CANCELED_BY_USER' || status === 'CANCELED_BY_SHOP') {
        await orderServices.updateStockQuantity('INCREASE', order.items);
      }

      return res.status(200).json(order);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
