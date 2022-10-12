import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedNavIndex } from "../../redux/reducers/appReducer";
import PreviewPage from "../PreviewPage/PreviewPage"
import ValueCardsDashboard from "../ValueCardDashboardPage/ValueCardsDashboard";

const AppreciatePage = () => {
  const [showPreviewPage, setShowPreviewPage] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const dispatch = useDispatch();

  dispatch(setSelectedNavIndex(0));


  const [templateData, setTemplateData] = useState([]);

  const fetchData = async () => {
    try{
      let res = await axios.get("http://localhost:8080/appreciation/getTemplate");
      if (res.status === 200) {
        // console.log(res.data)
        setTemplateData(res.data.data)
      }
    } catch(error) {
      console.error(error)
    }
  }

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setShowPreviewPage(true);
  }

  const showDashBoard = () => {
    setShowPreviewPage(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    showPreviewPage ? <PreviewPage showDashBoard={showDashBoard} selectedTemplate={selectedTemplate} templateData={templateData} /> : <ValueCardsDashboard templateData={templateData} setSelectedTemplate={handleSelectTemplate} />
  );
};

export default AppreciatePage;
