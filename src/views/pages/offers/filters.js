export const filterOffersBasedOnSearch = (offers, searchText) =>
  offers.filter((offer) =>Object.values(offer.name).some(name=> name.toLowerCase().includes(searchText.toLowerCase())));
