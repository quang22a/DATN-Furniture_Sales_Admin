const RESOURCES = {
  admin: "admin",
  auth: "auth",
  brand: {
    index: "brand",
    list: "brands",
  },
  category: {
    index: "category",
    list: "categories",
  },
  product: {
    index: "product",
    list: "products",
  },
  rating: {
    index: "rating",
    list: "ratings",
  },
  bill: {
    index: "bill",
    list: "bills",
  },
  customer: {
    index: "customer",
    list: "customers",
  },
  staff: {
    index: "staff",
    list: "staffs",
  },
  notification: {
    index: "notification",
    list: "notifications",
  },
  contact: {
    index: "contact",
    list: "contacts",
  },
  revenue: "revenues",
};

export const ENDPOINT = {
  admin: {
    index: `${RESOURCES.admin}`,
  },
  auth: {
    index: `${RESOURCES.auth}`,
    registerStaff: `${RESOURCES.auth}/register-staff`,
    login: `${RESOURCES.auth}/login`,
    profile: `${RESOURCES.auth}/profile`,
    updatePassword: `${RESOURCES.auth}/update-password`,
    requestResetPass: `${RESOURCES.auth}/reset-password`,
    confirmCode: `${RESOURCES.auth}/confirm-code`,
    changePasswordReset: `${RESOURCES.auth}/change-password`,
  },
  brand: {
    index: `${RESOURCES.brand.index}`,
    list: `${RESOURCES.brand.list}`,
  },
  category: {
    index: `${RESOURCES.category.index}`,
    list: `${RESOURCES.category.list}`,
  },
  product: {
    index: `${RESOURCES.product.index}`,
    list: `${RESOURCES.product.list}`,
  },
  rating: {
    index: `${RESOURCES.rating.index}`,
    list: `${RESOURCES.rating.list}`,
  },
  bill: {
    index: `${RESOURCES.bill.index}`,
    list: `${RESOURCES.bill.list}`,
  },
  customer: {
    index: `${RESOURCES.customer.index}`,
    list: `${RESOURCES.customer.list}`,
  },
  staff: {
    index: `${RESOURCES.staff.index}`,
    list: `${RESOURCES.staff.list}`,
  },
  notification: {
    index: `${RESOURCES.notification.index}`,
    list: `${RESOURCES.notification.list}`,
  },
  contact: {
    index: `${RESOURCES.contact.index}`,
    list: `${RESOURCES.contact.list}`,
  },
  revenue: `${RESOURCES.revenue}`,
};
