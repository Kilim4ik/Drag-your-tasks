export const newListPreset = () => ({
  id: Date.now(),
  name: "Write a name of list...",
  tasks: [],
});
export const getData = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  return data ? data : [newListPreset()];
};
export const setData = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
