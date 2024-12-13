import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Components/Home/home";
import { Gallery } from "./Components/Gallery/gallery";
import { Login } from "./Components/Login/login";
import { Profile } from "./Components/Profile/profile";
import { Service } from "./Components/Service/service";
import { Canteen } from "./Components/Canteen/canteen";
import { Menu } from "./Components/Menu/menu";
import { Feedback } from "./Components/Feedback/feedback";
import { Contact } from "./Components/Contact/contact";
import { Airlines } from "./Components/Airlines/airlines";
import { Routes } from "./Components/Routes/routes";
import { Class } from "./Components/Class/class";
import { Booking } from "./Components/Booking/booking";
import { Forget } from "./Components/Login/forget";
import { ChangePassword } from "./Components/Changepassword/changepassword";
import { NetworkErrorcompoes } from "./Components/NetworkErrorcompoes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/gallery">
          <Gallery />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/service">
          <Service />
        </Route>
        <Route path="/canteen">
          <Canteen />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/airlines">
          <Airlines />
        </Route>
        <Route path="/routes">
          <Routes />
        </Route>
        <Route path="/class">
          <Class />
        </Route>
        <Route path="/booking">
          <Booking />
        </Route>
        <Route path="/forget">
          <Forget/>
        </Route>
        <Route path="/changepassword">
          <ChangePassword/>
        </Route>
        <Route path="/networkErrorcompoes">
          <NetworkErrorcompoes/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
