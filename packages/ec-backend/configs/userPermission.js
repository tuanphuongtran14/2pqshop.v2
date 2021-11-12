module.exports = {
  ROLES: [
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
      roleKey: 'user',
      permissions: [
      ],
    },
    {
      roleKey: 'sales_staff',
      permissions: [
        { path: '/users', isExactly: false },
      ],
    },
    {
      roleKey: 'warehouse_staff',
      permissions: [
        { path: '/users', isExactly: false },
      ],
    },
    {
      roleKey: 'super_admin',
      permissions: [
        { path: '/users', isExactly: false },
        { path: '/roles', isExactly: false },
        { path: '/products', isExactly: false },
      ],
    },
  ],
};
