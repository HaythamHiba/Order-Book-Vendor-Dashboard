import { history } from "../../../history";
import { baseURL } from "api/config";
import { toast } from "react-toastify";
import _axios from "axios";
import { authStorage } from "utility/authStorage";

const API = {
  LOGIN: `/login`,
  LOGOUT: `/api/vendor/logout`,
};

export const login = ({ username, password }) => {
  const axios = _axios.create({
    baseURL,
  });
  return (dispatch) => {
    dispatch({
      type: "START_LOGIN",
    });
    axios
      .post(API.LOGIN, { username, password })
      .then((response) => {
        
        const { data,meta } = response.data;
        if (data && meta.access_token) {
          const user=data;
          const token=meta.access_token;

          authStorage.store(user, token);

          dispatch({
            type: "LOGIN",
            payload: { user, token },
          });

          history.push("/");
          dispatch({
            type: "END_LOGIN",
          });
        }
      })
      .catch((err) => {
        toast.error(err?.response?.message || "Failed To Login");
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
