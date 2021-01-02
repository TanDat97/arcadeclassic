export const Constant = Object.freeze({
  ACTIVE: 1,
  DEACTIVE: 0,
  INACTIVE: 0,
  SUPER_ADMIN_CODE: 'management.superadmin',
  PAGE: 1,
  LIMIT: 10,
  SERVICE: {
    AUTH: 'auth_api',
    USER: 'user_api',
    STORE: 'store_api',
    MENU: 'menu_api',
    CUSTOMER: 'customer_api',
    SYSTEM: 'system_api',
    PROMOTION: 'promotion_api',
    ORDER: 'order_api',
    CONTENT: 'content_api',
    PAYMENT: 'payment_api',
    DRIVER: 'driver_api',
  },
  KEY_CACHE: {
    CLIENT: 'client',
    STORE: 'store',
    STORE_GROUP: 'store-group',
    PRODUCT: 'product',
    TOPPING: 'topping',
  },
  CONFIG_DISCOUNT_TYPE: {
    PERCENT: {
      KEY: 1,
      NAME: 'Percent',
    },
    CASH: {
      KEY: 2,
      NAME: 'Cash',
    },
    PRODUCT: {
      KEY: 3,
      NAME: 'Product',
    },
    POINT: {
      KEY: 4,
      NAME: 'Point',
    },
    DELIVERY_FREE: {
      KEY: 5,
      NAME: 'Delivery free',
    },
  },
});
