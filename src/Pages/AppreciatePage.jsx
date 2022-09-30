import axios from "axios";
import React, { createRef, useCallback, useEffect, useState } from "react";
import PreviewPage from "./PreviewPage";
import ValueCardsDashboard from "./ValueCardsDashboard";

const AppreciatePage = () => {
  const [showPreviewPage, setShowPreviewPage] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, [])

  return (
    showPreviewPage ? <PreviewPage selectedTemplate={selectedTemplate} templateData={templateData} /> : <ValueCardsDashboard templateData={templateData} setSelectedTemplate={handleSelectTemplate} />
  );
};

export default AppreciatePage;
