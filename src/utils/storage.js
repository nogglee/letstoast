export const saveTimeToLocalStorage = (time) => {
  localStorage.setItem("savedTime", JSON.stringify(time));
};

export const getTimeFromLocalStorage = () => {
  const savedTime = localStorage.getItem("savedTime");
  return savedTime ? JSON.parse(savedTime) : null;
};