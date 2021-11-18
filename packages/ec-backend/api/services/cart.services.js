/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
const _ = require('lodash');

module.exports = {
  formatCart: (cart) => {
    const formattedCart = cart.toJSON();
    formattedCart.canOrder = true;

    formattedCart.totalAmount = 0;
    formattedCart.items = cart.items.map((item) => {
      const formattedItem = item.toJSON();
      // Re-calculate total price of the cart
      formattedCart.totalAmount += formattedItem.product.price * formattedItem.quantity;
      // Check remaining numbers of the item
      const { remaining } = formattedItem.product.options.find(
        (option) => option.size === formattedItem.size,
      );
      formattedItem.remaining = remaining;
      formattedItem.isAvailable = true;
      if (remaining < formattedItem.quantity) {
        formattedCart.canOrder = false;
        formattedItem.isAvailable = false;
      }

      return formattedItem;
    });

    // Todo: Handle coupon
    // if (formattedCart.coupon) {

    // }
    formattedCart.finalAmount = formattedCart.totalAmount;
    return formattedCart;
  },

  addItemToCart: async (cart, item) => {
    const existed = cart.items.find(
      (cartItem) =>
        item.product === cartItem.product._id.toString()
        && item.size === cartItem.size,
    );
    if (existed) {
      existed.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    await cart.save();
    return cart;
  },

  removeItemFromCart: async (cart, itemId) => {
    cart.items = cart.items.filter(
      (cartItem) => cartItem._id.toString() !== itemId,
    );

    await cart.save();
    return cart;
  },

  changeItemQuantity: async (cart, itemId, quantity) => {
    if (!_.isInteger(quantity) || quantity < 1) {
      throw new Error('Quantity must be a number and greater than 0');
    }

    cart.items.forEach((item) => {
      if (item._id.toString() === itemId) {
        item.quantity = quantity;
      }
    });
    await cart.save();
    return cart;
  },

  changeItemSize: async (cart, itemId, size) => {
    cart.items.forEach((item) => {
      if (item._id.toString() === itemId) {
        item.size = size;
      }
    });
    await cart.save();
    return cart;
  },
};
