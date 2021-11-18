const query = require('../../utils/query');
const handleError = require('../../utils/handleErrorResponse');
const cartServices = require('../services/cart.services');

module.exports = {
  addItemToCart: async (req, res) => {
    try {
      const { user } = req.state;
      const populates = [
        {
          path: 'coupon',
        },
        {
          path: 'items.product',
          populate: {
            path: 'options',
            model: 'Variation',
          },
        },
      ];
      const params = req.body;
      let cart = await query('Cart').findOne({ user: user.id });
      if (!cart) {
        cart = await query('Cart').create({
          user: user.id,
          items: [params],
        });
      } else {
        cart = await cartServices.addItemToCart(cart, params);
      }

      cart = await query('Cart').findOne({ user: user.id }, populates);
      cart = cartServices.formatCart(cart);
      return res.status(200).json(cart);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  removeItemFromCart: async (req, res) => {
    try {
      const { user } = req.state;
      const populates = [
        {
          path: 'coupon',
        },
        {
          path: 'items.product',
          populate: {
            path: 'options',
            model: 'Variation',
          },
        },
      ];
      const { id: itemId } = req.body;
      let cart = await query('Cart').findOne({ user: user.id });
      if (!cart) {
        cart = await query('Cart').create({
          user: user.id,
          items: [],
        });
      } else {
        cart = await cartServices.removeItemFromCart(cart, itemId);
      }

      cart = await query('Cart').findOne({ user: user.id }, populates);
      cart = cartServices.formatCart(cart);
      return res.status(200).json(cart);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  changeItemQuantity: async (req, res) => {
    try {
      const { user } = req.state;
      const populates = [
        {
          path: 'coupon',
        },
        {
          path: 'items.product',
          populate: {
            path: 'options',
            model: 'Variation',
          },
        },
      ];
      const { id: itemId, quantity } = req.body;
      let cart = await query('Cart').findOne({ user: user.id });
      if (!cart) {
        cart = await query('Cart').create({
          user: user.id,
          items: [],
        });
      } else {
        cart = await cartServices.changeItemQuantity(cart, itemId, quantity);
      }

      cart = await query('Cart').findOne({ user: user.id }, populates);
      cart = cartServices.formatCart(cart);
      return res.status(200).json(cart);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  getMyCart: async (req, res) => {
    try {
      const { user } = req.state;
      const populates = [
        {
          path: 'coupon',
        },
        {
          path: 'items.product',
          populate: {
            path: 'options',
            model: 'Variation',
          },
        },
      ];
      let cart = await query('Cart').findOne({ user: user.id }, populates);
      if (!cart) {
        cart = await query('Cart').create({
          user: user.id,
          items: [],
        }, populates);
      }

      cart = cartServices.formatCart(cart);
      return res.status(200).json(cart);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  getItemNumbers: async (req, res) => {
    try {
      const { user } = req.state;
      let cart = await query('Cart').findOne({ user: user.id });
      if (!cart) {
        cart = await query('Cart').create({
          user: user.id,
          items: [],
        });
      }

      return res.status(200).json(cart.items.length);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  changeItemSize: async (req, res) => {
    try {
      const { user } = req.state;
      const populates = [
        {
          path: 'coupon',
        },
        {
          path: 'items.product',
          populate: {
            path: 'options',
            model: 'Variation',
          },
        },
      ];
      const { id: itemId, size } = req.body;
      let cart = await query('Cart').findOne({ user: user.id });
      if (!cart) {
        cart = await query('Cart').create({
          user: user.id,
          items: [],
        });
      } else {
        cart = await cartServices.changeItemSize(cart, itemId, size);
      }

      cart = await query('Cart').findOne({ user: user.id }, populates);
      cart = cartServices.formatCart(cart);
      return res.status(200).json(cart);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
