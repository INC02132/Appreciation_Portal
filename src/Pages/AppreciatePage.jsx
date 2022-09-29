import axios from "axios";
import React, { createRef, useCallback, useEffect, useState } from "react";
import PreviewPage from "./PreviewPage";
import ValueCardsDashboard from "./ValueCardsDashboard";

const AppreciatePage = () => {
  const [showPreviewPage, setShowPreviewPage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTemplateImage, setSelecteImage] = useState(null);

  const [templateData, setTemplateData] = useState([]);

  const fetchData = async () => {
    let res = await axios.get("http://localhost:8080/appreciation/getTemplate");
    if (res.status === 200) {

      // console.log(res.data)
      setTemplateData(res.data.data)
    }
  }

  const setSelectedTemplate = (template) => {
    setSelectedCategory(template.category);
    setSelecteImage(template.templateFile);
    setShowPreviewPage(true);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    showPreviewPage ? <PreviewPage selectedCategory={selectedCategory} selectedTemplateImage={selectedTemplateImage} templateData={templateData} /> : <ValueCardsDashboard templateData={templateData} setSelectedTemplate={setSelectedTemplate} />
  );
};

export default AppreciatePage;
