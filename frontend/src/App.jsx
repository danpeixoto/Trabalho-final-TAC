import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Register from "./components/pages/Register";
import Admin from "./components/pages/Admin";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Product from "./components/pages/Product";
import store from "./store";
import SearchedProducts from "./components/pages/SearchedProducts";
import { loadUser } from "./actions/users";
import setAuthToken from "./utils/setAuthToken";
import UserSales from "./components/pages/UserSales";
import UserCart from "./components/pages/UserCart";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <section className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/searched-products/:name"
              component={SearchedProducts}
            />
            <Route exact path="/my-purchases" component={UserSales} />
            <Route exact path="/cart" component={UserCart} />
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
