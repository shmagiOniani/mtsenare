import {
    Home,
    Product,
    ProductList,
    AddProduct,
    AboutUs,
    Faq
  } from "../pages";
import ContactUs from "../pages/contactUs/ContactUs";
  
  export const PUBLIC_ROUTES = [
    {
      path: "/about-us",
      component: AboutUs,
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
  