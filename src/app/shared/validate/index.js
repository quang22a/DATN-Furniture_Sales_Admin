export const validateEmail = {
  required: 'Bạn phải nhập email',
  pattern: {
    value: /^[a-z]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
    message: 'Email không hợp lệ',
  },
};
export const validatePhone = {
  required: 'Bạn phải nhập số điện thoại',
  pattern: {
    value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
    message: 'Số điện thoại không hợp lệ',
  },
};
