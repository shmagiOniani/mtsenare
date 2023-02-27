// ..

import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import {
  UserContext,
  UserContextProvider,
} from "./components/contexts/UserContext";
import {
  TranslationContextProvider,
  TranslationContext,
} from "./components/contexts/TranslationContext";
import { GeneralContextProvider } from "./components/contexts/GeneralContext";
import PrivateRoute from "./components/contexts/PrivateRoute";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "./components/dashboard/Header";
import Navbar from "./components/dashboard/Navbar";
import { privateRoute } from "./utils/routes";
import { NotFound, Login, Logout, Home } from "./pages";
import "./index.scss";
import ApplicationForm from "./components/PDFViews/ApplicationForm";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentLanguage } = useContext(TranslationContext);
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  return (
    <TranslationContextProvider>
      <HelmetProvider>
        <Helmet htmlAttributes={{ lang: currentLanguage }}>
          <title>Dashboard</title>
        </Helmet>
      </HelmetProvider>

      <BrowserRouter>
        <>
          <UserContextProvider>
            <GeneralContextProvider>
              {/* {token !== null && ( */}
                <Header
                  setSidebarOpen={setSidebarOpen}
                  sidebarOpen={sidebarOpen}
                />
              {/* )} */}
              {/* {token !== null && ( */}
                <Navbar
                  setSidebarOpen={setSidebarOpen}
                  sidebarOpen={sidebarOpen}
                />
              {/* )} */}
              <Switch>
                <Route path="/pdf" component={ApplicationForm} />
                {/* <Route exact path="/">
                  {token ? (
                    <Redirect to="/home" component={Home} />
                  ) : (
                    <Redirect to="/login" component={Login} />
                  )}
                </Route> */}
                <Route path="/login">
                  {token !== null ? <Redirect to="/home" /> : <Login />}
                </Route>
                {/* {token === null ? (
                  <Route path="/" component={Login}>
                    <Redirect to="/login" component={Login} />
                  </Route>
                ) : (
                  ""
                )} */}
                <Route path="/logout" component={Logout} />
                {privateRoute?.map((route, index) => {
                  return (
                    <PrivateRoute
                      key={index}
                      path={route.path + route.layout}
                      exact={route.exact}
                      component={route.component}
                      permission={route?.permission}
                    />
                  );
                })}
                <Route
                  path="*"
                  exact={true}
                  component={!token ? Login : NotFound}
                />
              </Switch>
            </GeneralContextProvider>
          </UserContextProvider>
        </>
      </BrowserRouter>
    </TranslationContextProvider>
  );
}
