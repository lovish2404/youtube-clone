import React from "react";
import { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";
import { Pages } from "../data";
import { Bars } from "./FaBars";
import { NavLink } from "react-router-dom";
export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, setVideoList } = useGlobalContext();
  function handler(e) {
    if (!e.currentTarget.classList.contains("active-nav")) {
      setVideoList([]);
    }
    setSidebarOpen(false);
  }

  const ref = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (!ref.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  }
  {
    return (
      <>
        <aside className={sidebarOpen ? "sidebar show" : "sidebar"} ref={ref}>
          <Bars prop="inSidebar"></Bars>
          <div className="sidebarHeader">
            <h2> Sidebar</h2>
          </div>
          <ul className="links">
            {Pages.map(({ name, to, keyId }) => {
              return (
                <NavLink
                  key={keyId}
                  to={to}
                  onClick={handler}
                  className={({ isActive }) =>
                    isActive ? `navlink active-nav` : "navlink"
                  }
                >
                  {name}
                </NavLink>
              );
            })}
          </ul>
        </aside>
      </>
    );
  }
};
