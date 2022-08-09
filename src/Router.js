import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { AuthComponent } from "AuthComponent";

const HomePage = lazy(() => import("./views/pages/home/HomePage"));

const MyAccountPage = lazy(() => import("views/pages/my_account/MyAccount"));

const MyShopPage=lazy(()=>import ("./views/pages/my_shop/MyShopPage"))
const CategoriesPage=lazy(()=>import("./views/pages/categories/CategoriesPage"))
const SubCategoriesPage=lazy(()=>import("./views/pages/subcategories/SubCategoriesPage"))

const ViewOneItemPage = lazy(() =>
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
           path="/categories"
           component={CategoriesPage}
           isPrivate
          />
          <AppRoute
           exact
           path="/subcategories"
           component={SubCategoriesPage}
           isPrivate
          />
               <AppRoute
            exact
            path="/items/add"
            component={AddProductPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/items/view-all"
            component={ViewAllProductsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/items/view-one/:id/category/:category_id"
            component={ViewOneItemPage}
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
