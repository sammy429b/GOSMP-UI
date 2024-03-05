import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className="navbar bg-base-200 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/"> Home</NavLink>
              </li>

              <li>
                <NavLink to="/riskform">Portfolio</NavLink>
              </li>

              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">GOSMP</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">

            <li>
              <Link to="/"> Home</Link>
            </li>

            <li>
              <Link to="/riskform">Portfolio</Link>
            </li>

            {/* <li>
              <Link to="/about">About</Link>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate mx-4">
            <input onClick={toggleTheme} type="checkbox" />
            <span class="swap-on material-symbols-outlined">dark_mode</span>
            <span class="swap-off material-symbols-outlined">light_mode</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default Navbar;
