import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { AuthComponent } from "AuthComponent";

const HomePage = lazy(() => import("./views/pages/home/HomePage"));

const MyAccountPage = lazy(() => import("views/pages/my_account/MyAccount"));

const DiscountsPage=lazy(()=>import("./views/pages/discounts/DicountsPage"))
const MyShopPage=lazy(()=>import ("./views/pages/my_shop/MyShopPage"))

const ViewOneProductPage = lazy(() =>
  import("./views/pages/products/view-one/ViewOneProductPage")
);
const AddProductPage = lazy(() =>
  import("./views/pages/products/shops_products/AddShopProductPage")
);
const ViewAllProductsPage = lazy(() =>
  import("./views/pages/products/shops_products/ViewAllShopProductsPage")
);

// Route-based code splitting
const login = lazy(() => import("./views/pages/authentication/login/Login"));
const error404 = lazy(() => import("./views/pages/misc/error/404"));
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  auth,
  isPrivate,
  ...rest
}) => {
  const ToRender = () => (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
              return (
                <LayoutTag {...props} permission={auth.user.role}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );

  if (isPrivate) {
    return (
      <AuthComponent>
        <ToRender />
      </AuthComponent>
    );
  }
  return <ToRender />;
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={HomePage} isPrivate />
          <AppRoute
            exact
            path="/myAccount"
            component={MyAccountPage}
            isPrivate
          />
               <AppRoute
            exact
            path="/products/add"
            component={AddProductPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/products/view-all"
            component={ViewAllProductsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/products/view-one/:id"
            component={ViewOneProductPage}
            isPrivate
          />
        
          
          
          <AppRoute
            exact
            path="/my_shop"
            component={MyShopPage}
            isPrivate
          />
        
        
          <AppRoute path="/login" component={login} fullLayout />
          <AppRoute
            path="/misc/not-authorized"
            component={authorized}
            fullLayout
          />
          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
