export function formatPrice(n) {
  return n.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
