import React from "react";
import { NavLink } from "react-router-dom";
import { Disc, X, Circle } from "react-feather";
import classnames from "classnames";
import Logo_2 from 'assets/img/logo/LOGO.png'
import smallLogo from 'assets/img/logo/LOGO.png'
import { useDirection } from "utility/context/Layout";
import { ImageURL } from "api/config";
import { useAuth } from "redux/hooks/auth";
const SidebarHeader = ({
  toggleSidebarMenu,
  activeTheme,
  collapsed,
  toggle,
  sidebarVisibility,
  menuShadow,
}) => {

  const { user,isLoading } = useAuth();
  
  const image = user?.logo;
  const dir = useDirection();
  const logoStyles =
    dir === "ltr" ? { marginRight: "10rem" } : { marginLeft: "10rem" };

  return (
    <div style={{ padding: "0 12px", height: collapsed?"70px":"100px" }} className="navbar-header">
      <ul style={{ justifyContent: "center" }} className="nav navbar-nav flex-row">
        <li style={{ alignItems: "center" }} className="nav-item d-flex  w-100 ">
          <NavLink to="/" className="navbar-brand mt-0 w-100">
            {!collapsed ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"


                }}
              >
                <img loading="lazy" width="150" src={isLoading ? Logo_2 : `${ImageURL}${image}`} alt="" />
              </div>
            ) : (
              <img loading="lazy" style={{ objectFit: "contain", width: "55px", height: "80px !important", ...logoStyles }} src={smallLogo} alt="" />
            )}
          </NavLink>

          <div className="nav-link modern-nav-toggle">
            {collapsed === false ? (
              <Disc
                onClick={() => {
                  toggleSidebarMenu(true);
                  toggle();
                }}
                className={classnames(
                  "toggle-icon icon-x d-none d-xl-block font-medium-4",
                  {
                    "text-primary": activeTheme === "primary",
                    "text-success": activeTheme === "success",
                    "text-danger": activeTheme === "danger",
                    "text-info": activeTheme === "info",
                    "text-warning": activeTheme === "warning",
                    "text-dark": activeTheme === "dark",
                  }
                )}
                size={20}
                data-tour="toggle-icon"
              />
            ) : (
              <Circle
                onClick={() => {
                  toggleSidebarMenu(false);
                  toggle();
                }}
                className={classnames(
                  "toggle-icon icon-x d-none d-xl-block font-medium-4",
                  {
                    "text-primary": activeTheme === "primary",
                    "text-success": activeTheme === "success",
                    "text-danger": activeTheme === "danger",
                    "text-info": activeTheme === "info",
                    "text-warning": activeTheme === "warning",
                    "text-dark": activeTheme === "dark",
                  }
                )}
                size={20}
              />
            )}
            <X
              onClick={sidebarVisibility}
              className={classnames(
                "toggle-icon icon-x d-block d-xl-none font-medium-4",
                {
                  "text-primary": activeTheme === "primary",
                  "text-success": activeTheme === "success",
                  "text-danger": activeTheme === "danger",
                  "text-info": activeTheme === "info",
                  "text-warning": activeTheme === "warning",
                  "text-dark": activeTheme === "dark",
                }
              )}
              size={20}
            />
          </div>
        </li>
        {/* <li className="nav-item nav-toggle"></li> */}
      </ul>
      <div
        className={classnames("shadow-bottom", {
          "d-none": menuShadow === false,
        })}
      />
    </div>
  );
};

export default SidebarHeader;
