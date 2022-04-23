import React from "react";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// Routes
import { PUBLIC_ROUTES } from "./utils/routes";
import 'antd/dist/antd.min.css'
import "./App.scss"

function App() {

  return (
    <Router>
      <div className="app">
        {/* <Header /> */}
        <div className="app-container">
          <Switch>
            {PUBLIC_ROUTES.map((index) => {
              return (
                <Route
                  path={index.layout + index.path}
                  component={index.component}
                  key={index.path}
                />
              );
            })}
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;

// <Redirect to="/NotFound" />
