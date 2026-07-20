
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

function AppLayout() {
   const [collapsed, setCollapsed] = useState(false);

   const toggleSidebar = () => {
     setCollapsed((prev) => !prev);
   };

  return (
    <div className="flex h-screen bg-slate-950">
      { <Sidebar
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
      /> }
      {/* <Sidebar /> */}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* { <Header
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
        /> } */}
        <Header /> 


        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;