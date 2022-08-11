import React from "react";

import { Home } from "react-feather";

import { BsShop } from "react-icons/bs";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { BiCategory } from "react-icons/bi";
import {  MdOutlineCategory } from "react-icons/md";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
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
    id: "shop",
    title: "my_shop",
    type: "item",
    icon: <BsShop size={20} />,
    navLink: "/my_shop",
  },
  {
    id:"images",
    title:"images",
    type:"item",
    icon:<InsertPhotoIcon size={20}/>,
    navLink:"/images"
  },
  {
    id: "categories",
    title: "categories",
    type: "item",
    icon: <BiCategory size={20} />,
    navLink: "/categories",
  },
  {
    id: "subcategories",
    title: "subcategories",
    type: "item",
    icon: <MdOutlineCategory size={20} />,
    navLink: "/subcategories",
  },
  {
    id: "items",
    title: "items",
    type: "item",
    icon: <RestaurantIcon size={20} />,
    navLink: "/items/view-all"

  },


  {
    id: "offers",
    title: "offers",
    type: "item",
    icon: <LocalOfferIcon size={20} />,
    navLink: "/offers"
  },

];

export default navigationConfig;
