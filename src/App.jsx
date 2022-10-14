import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import CustomTheme from "./Theme/CustomTheme";
import AppBarComponent from "./Components/AppBarComponent/AppBarComponent";
import SideNavBar from "./Components/SideNavbar/SideNavbar";
import AppreciatePage from "./Pages/AppreciatePage/AppreciatePage";
import AppreciationSent from "./Pages/AppreciateSentPage/AppreciationSent";
import AppreciationReceived from "./Pages/AppreciationReceivedPage/AppreciationReceived";
import './App.css'
import AllAppreciationPage from "./Pages/AllAppreciationPage/AllAppreciationPage";

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
              <Route exact path="/appreciate" component={AppreciatePage} />
              <Route exact path="/received" component={AppreciationReceived} />
              <Route exact path="/sent" component={AppreciationSent} />
              <Route exact path="/allAppreciation" component={AllAppreciationPage} />
              <Redirect exact from="*" to="/appreciate" />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
