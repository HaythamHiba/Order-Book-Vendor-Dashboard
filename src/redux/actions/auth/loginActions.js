import { history } from "../../../history";
import { baseURL } from "api/config";
import { toast } from "react-toastify";
import _axios from "axios";
import { authStorage } from "utility/authStorage";

const API = {
  LOGIN: `/api/vendor/login`,
  LOGOUT: `/api/vendor/logout`,
};

export const login = ({ email, password }) => {
  const axios = _axios.create({
    baseURL,
  });
  return (dispatch) => {
    dispatch({
      type: "START_LOGIN",
    });
    axios
      .post(API.LOGIN, { email, password })
      .then((response) => {
        const { data } = response.data;
        if (data && data.token) {
          const { token, user,shop } = data;

          authStorage.store(user, token,shop);

          dispatch({
            type: "LOGIN",
            payload: { user, token,shop },
          });

          history.push("/");
          dispatch({
            type: "END_LOGIN",
          });
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed To Login");
        dispatch({
          type: "END_LOGIN",
        });
      });
  };
};
export const updateUserInfo = (user) => {
    authStorage.storeUser(user)
  return (dispatch) => {
    dispatch({
      type: "UPDATE",
      payload: { user }
    })

  }
}
export const updateShop = (shop) => {
  authStorage.storeShop(shop)
return (dispatch) => {
  dispatch({
    type: "UPDATE_SHOP",
    payload: { shop }
  })

}
}

export const logout = () => {
  return (dispatch) => {
    const token = authStorage.getToken();
    authStorage.remove();

    dispatch({ type: "LOGOUT" });
    history.push("/login");

    if (token) {
      const axios = _axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        baseURL,
      });
      axios.get(API.LOGOUT).catch(() => { });
    }
  };
};
