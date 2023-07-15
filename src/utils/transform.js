export const createSize = (el) => {
  const sizes = { 1: "S", 2: "M", 3: "L", 4: "XL" };
  return sizes[el.id];
};
export const createGender = (el) => {
  return el.genderId == 1 ? "Male" : "Female";
};
export const createCategory = (el) => {
  return el.Category.category[0].toUpperCase() + el.Category.category.slice(1);
};
