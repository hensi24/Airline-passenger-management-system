import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Components/Home/home";
import { Gallery } from "./Components/Gallery/gallery";
import { Service } from "./Components/Service/service";
import { Feedback } from "./Components/Feedback/feedback";
import { Profile } from "./Components/Profile/profile";
import { Login } from "./Components/Login/login";
import { Protector } from "./Components/protector";
import { Canteen } from "./Components/Canteen/canteen";
import { Airlinesroute } from "./Components/Airlinesroute/airlinesroute";
import { Book } from "./Components/Airlinesroute/book";
import { Forget } from "./Components/Login/Forget";
import { ChangePassword } from "./Components/Changepassword/changepassword";
import { NetworkErrorcompoes } from "./Components/NetworkErrorcompoes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/gallery">
          <Gallery />
        </Route>
        <Route path="/service">
          <Service />
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>
        <Route path="/profile">
          <Protector>
            <Profile />
          </Protector>
        </Route>
        <Route path="/airlinesroute">
          <Protector>
            <Airlinesroute />
          </Protector>
        </Route>
        <Route path="/book/:cat?">
          <Protector>
            <Book />
          </Protector>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/forget">
          <Forget />
        </Route>
        <Route path="/canteen">
          <Canteen />
        </Route>
        <Route path = "/changepassword">
          <ChangePassword />
        </Route>
        <Route path = "/NetworkErrorcompoes">
          <NetworkErrorcompoes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
