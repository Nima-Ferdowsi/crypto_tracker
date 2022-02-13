export const getlocal = (local) => {
  let data;
  try {
    if (localStorage.getItem(local) === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem(local));
    }
  } catch (error) {
    data = [];
  }

  return data;
};
