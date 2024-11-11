export const isSameDay = (date1, date2) => {
  const d1 = new Date(Number(date1));
  const d2 = new Date(Number(date2));
  
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const formatDateTime = (timestamp) => {
  if (!timestamp || isNaN(timestamp)) return '-';
  const date = new Date(Number(timestamp));
  if (isNaN(date.getTime())) return '-';
  
  const year = date.getFullYear().toString().slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};
