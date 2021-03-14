import { React, Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Landing } from "./components/landing";
import Login from "./components/Login";
import UserSignup from "./components/UserSignup";
import Dashboard from "./containers/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./Profile/Profile";
import Group from "./Group/Group";
import AddExpenseGroup from "./AddExpense/Add";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route path="/signup" component={UserSignup} />
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route path="/profile" component={Profile} />
            <Route path="/creategroup" component={Group} />
            <Route path="/expense" component={AddExpenseGroup} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
