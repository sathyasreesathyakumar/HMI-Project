type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

import { NavLink } from "react-router-dom";

import {
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

import { menuItems } from "../../data/menu";


function Sidebar({
  collapsed,
  toggleSidebar,
}: SidebarProps) {

  

 return (
  <aside
    className={`
      h-screen
      bg-slate-900
      text-slate-200
      transition-all
      duration-300
      flex
      flex-col
      border-r
      border-slate-700
      ${collapsed ? "w-20" : "w-64"}
    `}
  >

    {/* LOGO SECTION */}

    <div className="border-b border-slate-700 p-4">

      <div className="flex items-center justify-between">

        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">
              FAHI-Q
            </h1>

            <p className="text-xs text-slate-400">
              WE MAKE YOU PRINT
            </p>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="rounded-md p-2 hover:bg-slate-800"
        >
          <FaBars />
        </button>

      </div>

    </div>



    {/* MENU SECTION */}

    <nav className="mt-4 flex flex-1 flex-col gap-2 px-3">

      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.title}
            to={item.route}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg p-3 transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <Icon size={20} />

            {!collapsed && (
              <span className="font-medium">
                {item.title}
              </span>
            )}

          </NavLink>
        );
      })}

    </nav>



    {/* FOOTER */}

    <div className="border-t border-slate-700 p-4">

      <div className="flex items-center gap-2">

        <FaUserCircle size={24} />

        {!collapsed && (
          <div>

            <p className="text-sm">
              Operator
            </p>

            <p className="text-xs text-slate-400">
              Version 1.0.0
            </p>

          </div>
        )}

      </div>

    </div>

  </aside>
);
}

export default Sidebar;