export const filterCategoriesBasedOnSearch = (categories, searchText) =>
  categories.filter((category) =>Object.values(category.name).some(name=> name.toLowerCase().includes(searchText.toLowerCase())));
