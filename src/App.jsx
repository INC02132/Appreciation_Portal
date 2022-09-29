import AppreciatePage from "./Pages/AppreciatePage";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import CustomTheme from "./Theme/CustomTheme";
import AppBarComponent from "./Components/AppBarComponent/AppBarComponent";
import SideNavBar from "./Components/SideNavbar/SideNavbar";
import './App.css'
import AppreciationSent from "./Pages/AppreciationSent";
import AppreciationReceived from "./Pages/AppreciationReceived";
import ValueCardsDashboard from "./Pages/ValueCardsDashboard";

function App() {
  return (
    <Router>
      <ThemeProvider theme={CustomTheme}>
        <AppBarComponent />

        <div className="wbMainPageHeight">
          <div className="wbFloatLeft">
            <SideNavBar />
          </div>
          <div className="body-content">
            <Switch>
              <Route exact path="/appreciate" component={ValueCardsDashboard} />
              <Route exact path="/appreciatePreview" component={AppreciatePage} />
              <Route exact path="/received" component={AppreciationReceived} />
              <Route exact path="/sent" component={AppreciationSent} />
              <Redirect exact from="/" to="/appreciate" />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
