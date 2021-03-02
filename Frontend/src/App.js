import { React, Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Landing } from "./components/landing";
import Login from "./components/Login";
import CustomerSignup from "./components/CustomerSignup";
import Dashboard from "./containers/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./Profile/Profile";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route path="/signup" component={CustomerSignup} />
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
