import format from "date-fns/format";

export const convertDate = (dateString) => {
  const date = new Date(dateString);
  let day = format(date, "dd/MM/yyyy");
  day = day.split("/").join("-");
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  return `${day} ${hour}:${minutes}:${second}`;
};
