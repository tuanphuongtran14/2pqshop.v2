module.exports = {
  ROLES: [
    {
      name: 'Public',
      description: 'The default role for public',
      key: 'public',
    },
    {
      name: 'User',
      description: 'The default role for user',
      key: 'user',
    },
    {
      name: 'Sales Staff',
      description: 'The role for sales staff',
      key: 'sales_staff',
    },
    {
      name: 'Warehouse Staff',
      description: 'The role for warehouse staff',
      key: 'warehouse_staff',
    },
    {
      name: 'Super Admin',
      description: 'The role for super admin',
      key: 'super_admin',
    },
  ],

  DEFAULT_PERMISSIONS: [
    {
      roleKey: 'public',
      permissions: [
        { method: 'GET', path: '/products', isExactly: true },
        { method: 'GET', path: '/products/', isExactly: false },
        { method: 'GET', path: '/categories', isExactly: true },
        { method: 'GET', path: '/categories/', isExactly: false },
        { method: 'GET', path: '/tags', isExactly: true },
        { method: 'GET', path: '/tags/', isExactly: false },
        { method: 'POST', path: '/users/auth/local', isExactly: true },
        { method: 'POST', path: '/users/auth/local/register', isExactly: true },
        { method: 'POST', path: '/users/auth/send-email-confirmation', isExactly: true },
        { method: 'GET', path: '/users/auth/email-confirmation', isExactly: true },
        { method: 'POST', path: '/users/auth/forget-password', isExactly: true },
        { method: 'POST', path: '/users/auth/reset-password', isExactly: true },
      ],
    },
    {
      roleKey: 'user',
      permissions: [
        { method: 'GET', path: '/products', isExactly: true },
        { method: 'GET', path: '/products/', isExactly: false },
        { method: 'GET', path: '/categories', isExactly: true },
        { method: 'GET', path: '/categories/', isExactly: false },
        { method: 'GET', path: '/tags', isExactly: true },
        { method: 'GET', path: '/tags/', isExactly: false },
        { method: 'POST', path: '/users/auth/send-email-confirmation', isExactly: true },
        { method: 'GET', path: '/users/auth/email-confirmation', isExactly: true },
        { method: '*', path: '/users/me/cart', isExactly: false },
        { method: 'POST', path: '/users/auth/change-password', isExactly: true },
        { method: 'GET', path: '/users/me', isExactly: true },
        { method: 'POST', path: '/orders', isExactly: true },
        { method: 'GET', path: '/users/me/orders', isExactly: true },
        { method: 'POST', path: '/users/me/cart/apply-coupon', isExactly: true },
        { method: 'GET', path: '/users/me/cart/remove-coupon', isExactly: true },
        { method: 'GET', path: '/orders/', isExactly: false },
        { method: 'PUT', path: '/orders/update-status', isExactly: true },
      ],
    },
    {
      roleKey: 'sales_staff',
      permissions: [
        { method: 'GET', path: '/products', isExactly: true },
        { method: 'GET', path: '/products/', isExactly: false },
        { method: 'GET', path: '/categories', isExactly: true },
        { method: 'GET', path: '/categories/', isExactly: false },
        { method: 'GET', path: '/tags', isExactly: true },
        { method: 'GET', path: '/tags/', isExactly: false },
        { method: 'POST', path: '/users/auth/send-email-confirmation', isExactly: true },
        { method: 'GET', path: '/users/auth/email-confirmation', isExactly: true },
        { method: '*', path: '/users/me/cart', isExactly: false },
        { method: 'POST', path: '/users/auth/change-password', isExactly: true },
        { method: 'GET', path: '/users/me', isExactly: true },
      ],
    },
    {
      roleKey: 'warehouse_staff',
      permissions: [
        { method: 'GET', path: '/products', isExactly: true },
        { method: 'GET', path: '/products/', isExactly: false },
        { method: 'GET', path: '/categories', isExactly: true },
        { method: 'GET', path: '/categories/', isExactly: false },
        { method: 'GET', path: '/tags', isExactly: true },
        { method: 'GET', path: '/tags/', isExactly: false },
        { method: 'POST', path: '/users/auth/send-email-confirmation', isExactly: true },
        { method: 'GET', path: '/users/auth/email-confirmation', isExactly: true },
        { method: '*', path: '/users/me/cart', isExactly: false },
        { method: 'POST', path: '/users/auth/change-password', isExactly: true },
        { method: 'GET', path: '/users/me', isExactly: true },
      ],
    },
    {
      roleKey: 'super_admin',
      permissions: [
        { method: 'POST', path: '/users/auth/send-email-confirmation', isExactly: true },
        { method: 'GET', path: '/users/auth/email-confirmation', isExactly: true },
        { method: '*', path: '/users/me/cart', isExactly: false },
        { method: 'POST', path: '/users/auth/change-password', isExactly: true },
        { method: 'GET', path: '/users/me', isExactly: true },
        { method: '*', path: '/users', isExactly: false },
        { method: '*', path: '/roles', isExactly: true },
        { method: '*', path: '/products', isExactly: false },
        { method: '*', path: '/categories', isExactly: false },
        { method: '*', path: '/tags', isExactly: false },
        { method: '*', path: '/carts', isExactly: false },
        { method: 'POST', path: '/orders', isExactly: true },
        { method: 'GET', path: '/users/me/orders', isExactly: true },
        { method: 'POST', path: '/users/me/cart/apply-coupon', isExactly: true },
        { method: 'GET', path: '/users/me/cart/remove-coupon', isExactly: true },
        { method: 'GET', path: '/orders/', isExactly: false },
        { method: 'PUT', path: '/orders/update-status', isExactly: true },
        { method: '*', path: '/coupons', isExactly: false },
      ],
    },
  ],
};
