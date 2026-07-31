import React, { useState } from "react";
import Items from "./Items";
import Portfolio from "./Portfolio";
import Design from "./Design";
import ProjectDetailModal from "./ProjectDetailModal";

export default function Project() {
  const [activeTab, setActiveTab] = useState("ALL");

  return (
    <>
      <Items activeTab={activeTab} setActiveTab={setActiveTab} />
      <Portfolio activeTab={activeTab} />
      <Design />
      {/* <ProjectDetailModal/> */}
    </>
  );
}
