const PREFIX = "ORDER_BOOK_VENDOR";
const TOKEN_KEY = `${PREFIX}_TOKEN`;
const USER_KEY = `${PREFIX}_USER`;
const SHOP_KEY = `${PREFIX}_SHOP`;

//================ TOKEN =====================
const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

//================ USER =====================
const storeUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};
const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

//-----------------SHOP---------------------
const storeShop = (shop) => {
  localStorage.setItem(SHOP_KEY, JSON.stringify(shop));
};
const getShop = () => {
  return JSON.parse(localStorage.getItem(SHOP_KEY));
};
const removeShop = () => {
  localStorage.removeItem(SHOP_KEY);
};
//================ BOTH =====================
const store = (user, token,shop) => {
  storeUser(user);
  storeToken(token);
  storeShop(shop)
};
const remove = () => {
  removeToken();
  removeUser();
  removeShop();
};
const get = () => {
  return {
    user: getUser(),
    token: getToken(),
    shop:getShop()
  };
};

//================ EXPORT =====================
export const authStorage = {
  storeToken,
  getToken,
  removeToken,
  storeUser,
  getUser,
  removeUser,
  getShop,
  storeShop,
  removeShop,
  store,
  remove,
  get,
};
