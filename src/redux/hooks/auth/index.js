import { useSelector, useDispatch } from "react-redux";
import * as actions from "redux/actions/auth/loginActions";
import { VIEWER } from "configs/Roles";

export const useAuth = () => {
  const { user, token, isAuthenticated,shop ,isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const login = (values) => {
    dispatch(actions.login(values));
  };

  const updateUserInfo = (newValues) => {

    dispatch(actions.updateUserInfo(newValues))
  }
  const updateShop = (newValues) => {
   
    dispatch(actions.updateShop(newValues))
  }

  const logout = () => {
    dispatch(actions.logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    shop,
    login,
    logout,
    updateUserInfo,
    updateShop
  };
};

export const useIsAuthorized = () => {
  const { user } = useAuth();
  return user?.role_type !== VIEWER;
};
