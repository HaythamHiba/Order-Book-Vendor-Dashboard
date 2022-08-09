export const selectionFilter = (subcategories, category_id) =>
  subcategories.filter(
    (sub) => category_id === "" || sub.category_id === category_id
  );
  export const filterCategoriesBasedOnSearch = (categories, searchText) =>
  categories.filter((category) =>Object.values(category.name).some(name=> name.toLowerCase().includes(searchText.toLowerCase())));
