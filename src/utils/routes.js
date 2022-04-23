import {
    Home,
    Product,
    ProductList
  } from "../pages";
  
  export const PUBLIC_ROUTES = [
    {
      path: "/home",
      component: Home,
      layout: "",
    },
    {
      path: "/product-list",
      component: ProductList,
      layout: "",
    },
    {
      path: "/product",
      component: Product,
      layout: "/:id",
    },
  ];
  