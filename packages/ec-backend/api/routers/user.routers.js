const router = require('express').Router();
const {
  signUp,
  signIn,
  me,
  confirmEmail,
  resendEmailConfirmation,
  forgetPassword,
  resetPassword,
  changePassword,
} = require('../controllers/user.controllers');
const {
  getMyCart,
  addItemToCart,
  removeItemFromCart,
  getItemNumbers,
  changeItemQuantity,
  changeItemSize,
} = require('../controllers/cart.controllers');
const authentication = require('../middleware/authentication');
const permission = require('../middleware/permission');

// Sign in & Sign up
router.post('/auth/local', signIn);
router.post('/auth/local/register', signUp);

// Confirm email
router.post('/auth/send-email-confirmation', resendEmailConfirmation);
router.get('/auth/email-confirmation', confirmEmail);

// Forget password
router.get('/auth/forget-password', forgetPassword);
router.get('/auth/reset-password', resetPassword);

// User cart
router.post('/me/cart/add-item', authentication, permission, addItemToCart);
router.post('/me/cart/remove-item', authentication, permission, removeItemFromCart);
router.get('/me/cart/item-numbers', authentication, permission, getItemNumbers);
router.post('/me/cart/change-item-quantity', authentication, permission, changeItemQuantity);
router.post('/me/cart/change-item-size', authentication, permission, changeItemSize);
router.get('/me/cart', authentication, permission, getMyCart);

// Profile and update profile
router.get('/auth/change-password', authentication, changePassword);
router.get('/me', authentication, permission, me);

module.exports = router;
