import {
    Home,
    Product,
    ProductList,
    AddProduct,
    AboutUs,
    Faq,
    ShopList,
    Shop,
    ShoppingCart,
    Login,
    Test,
    UserProfile
  } from "../pages";
import Auth from "../pages/auth/Auth";
import ContactUs from "../pages/contactUs/ContactUs";
  
  export const PUBLIC_ROUTES = [
    {
      path: "/test",
      component: Test,
      layout: "",
    },
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
      path: "/my-acount",
      component: UserProfile,
      layout: "",
    },
    {
      path: "/login",
      component: Login,
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
    {
      path: "/shopping-cart",
      component: ShoppingCart,
      layout: "",
    },
  ];

  
  