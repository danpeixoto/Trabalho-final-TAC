import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Register from "./components/pages/Register";
import Admin from "./components/pages/Admin";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Product from "./components/pages/Product";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <section className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/product/:id" component={Product} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
