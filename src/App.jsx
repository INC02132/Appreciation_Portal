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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLeaderBoardData, setTemplateData, setUserRole } from "./redux/reducers/appReducer";
import axios from "axios";
import { baseUrl } from "./Utils/serviceRequest";
import { useMsal } from "@azure/msal-react";
import Help from "./Pages/Help/Help";
import AnalyticsPage from "./Pages/AnalyticsPage/AnalyticsPage";

function App() {

  const dispatch = useDispatch();

  const { accounts } = useMsal();

  const userRole = useSelector(state => state.appReducer.userRole);

  const fetchData = async () => {
    try {
      let res = await axios.get(`${baseUrl}/appreciation/getTemplate`);
      if (res.status === 200) {
        // console.log(res.data)
        dispatch(setTemplateData(res.data.data));
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getUser = async () => {
    try {
      let nameArray = accounts[0].name.split(" ");
      let firstName = nameArray[0];
      let lastName = "";
      nameArray.forEach((val, index) => {
        if (index !== 0)
          lastName += val + " ";
      })
      let body = {
        "emailId": accounts[0].username,
        "firstName": firstName,
        "lastName": lastName,
      }
      let res = await axios.post(`${baseUrl}/appreciation/createUser`, body);
      if (res.status === 200) {
        console.log(res.data)
        dispatch(setUserRole(res.data.role))
        fetchLeaderBoardData();
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchLeaderBoardData = async () => {
    try {
      let res = await axios.get(`${baseUrl}/appreciation/getTopUserCount`);
      if (res.status === 200) {
        dispatch(setLeaderBoardData(res.data.data));
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [])
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
              <Route exact path="/help" component={Help} />
              {
                userRole === "admin" &&
                <Route exact path="/allAppreciation" component={AllAppreciationPage} />
              }
              {
                userRole === "admin" &&
                <Route exact path="/analytics" component={AnalyticsPage} />
              }
              <Redirect exact from="*" to="/appreciate" />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
