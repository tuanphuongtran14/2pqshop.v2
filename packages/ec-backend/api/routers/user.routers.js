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

// Profile and update profile
router.get('/auth/change-password', authentication, changePassword);
router.get('/me', authentication, permission, me);

module.exports = router;
