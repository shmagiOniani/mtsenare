import {
    Home,
    Product,
    ProductList,
    AddProduct,
    AboutUs,
    Faq,
    ShopList,
    Shop
  } from "../pages";
import Auth from "../pages/auth/Auth";
import ContactUs from "../pages/contactUs/ContactUs";
  
  export const PUBLIC_ROUTES = [
    {
      path: "/about-us",
      component: AboutUs,
      layout: "",
    },
    {
      path: "/auth",
      component: Auth,
      layout: "",
    },
    {
      path: "/contact",
      component: ContactUs,
      layout: "",
    },
    {
      path: "/home",
      component: Home,
      layout: "",
    },
    {
      path: "/shop-list",
      component: ShopList,
      layout: "",
    },
    {
      path: "/shop",
      component: Shop,
      layout: "/:id",
    },
    {
      path: "/faq",
      component: Faq,
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
    {
      path: "/add-product",
      component: AddProduct,
      layout: "",
    },
  ];

  
  