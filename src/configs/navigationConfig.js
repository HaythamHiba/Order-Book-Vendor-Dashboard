import React from "react";

import { Home } from "react-feather";

import { BsShop } from "react-icons/bs";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { AiOutlineShoppingCart } from "react-icons/ai";
const navigationConfig = [
  {
    id: "home",
    title: "home",
    type: "item",
    icon: <Home size={20} />,
    navLink: "/",
  },
  {
    id: "my_account",
    title: "my_account",
    type: "item",
    icon: <ManageAccountsIcon size={20} />,
    navLink: "/myAccount"
  },

  {
    id: "shops",
    title: "my_shop",
    type: "item",
    icon: <BsShop size={20} />,
    navLink: "/my_shop",
  },
  {
    id: "products",
    title: "products",
    type: "item",
    icon: <AiOutlineShoppingCart size={20} />,
    navLink: "/products/view-all"

  },

  {
    id: "discounts",
    title: "discounts",
    type: "item",
    icon: <LocalOfferIcon size={20} />,
    navLink: "/discounts"
  },

];

export default navigationConfig;
