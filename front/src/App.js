import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// Routes
import { PUBLIC_ROUTES } from "./utils/routes";
import "antd/dist/antd.min.css";
import "./App.scss";
import ScrollToTop from "./utils/ScrollToTop";
import Spinner from "./components/spinner/Spinner";

function App() {
  const [bgColor, setBgColor] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    console.log("here");
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300);
  },[Route])

  useEffect(() => {
    if (fontColor && fontColor.length > 0) {
      document.documentElement.style.setProperty(
        "--app-primaryFontColor",
        localStorage.getItem("fontcolor")
      );
      localStorage.setItem("fontcolor", fontColor);
    }
  }, [fontColor]);

  useEffect(() => {
    if (bgColor && bgColor.length > 0) {
      document.documentElement.style.setProperty(
        "--app-primaryBGColor",
        localStorage.getItem("bgColor")
      );
      localStorage.setItem("bgColor", bgColor);
    }
  }, [bgColor]);

  useEffect(() => {
    setBgColor(localStorage.getItem("bgcolor"));
    setFontColor(localStorage.getItem("fontcolor"));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className={`app`}>
        {loading && <Spinner/>}
        {/* <div className="">
          <input
            id="font-color"
            type="color"
            value={fontColor || ""}
            onChange={(e) => setFontColor(e.target.value)}
          />
          <label htmlFor="font-color">font color</label>
          <input
            id="bg-color"
            type="color"
            value={bgColor || ""}
            onChange={(e) => setBgColor(e.target.value)}
          />
          <label htmlFor="bg-color">bg color</label>
        </div> */}
        <div className="app-container">
          <Switch>
            {PUBLIC_ROUTES.map((route, index) => {
              return (
                <Route
                  // exact
                  path={route.path + route.layout}
                  component={route.component}
                  key={route.path}
                />
              );
            })}
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

// <Redirect to="/NotFound" />
