import { React, Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Landing } from "./components/landing";
import Login from "./components/Login";
import CustomerSignup from './components/CustomerSignup';
//import SignUp from "./components/signup";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route path="/signup" component={CustomerSignup} />
            {/* <Route exact path="/signup" component={SignUp}></Route> */}
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
