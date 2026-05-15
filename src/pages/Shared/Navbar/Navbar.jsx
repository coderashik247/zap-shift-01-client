import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();

  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-secondary font-semibold border-b-2 border-primary"
      : "hover:text-primary transition duration-200";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Services
        </NavLink>
      </li>

      <li>
        <NavLink to="/send-parcel" className={navLinkClass}>
          Send Parcel
        </NavLink>
      </li>

      <li>
        <NavLink to="/coverage" className={navLinkClass}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/rider" className={navLinkClass}>
          Be a Rider
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard/my-parcels" className={navLinkClass}>
            My Parcels
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md mb-5">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-0">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
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
              className="menu menu-sm dropdown-content mt-3 z-1 p-3 shadow bg-white rounded-box w-56 space-y-2"
            >
              {links}
            </ul>
          </div>

          <Logo />
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-5 px-1 text-[15px]">
            {links}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3 relative">
          {/* USER */}
          {user && (
            <div className="dropdown dropdown-end">
              {/* AVATAR BUTTON */}
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 cursor-pointer rounded-full px-2 py-1 hover:bg-base-200 transition duration-200"
              >
                <div className="avatar">
                  <div className="w-11 rounded-full border-2 border-primary">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={user?.displayName}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* NAME */}
                <div className="hidden lg:block leading-tight">
                  <h3 className="font-semibold text-secondary text-sm">
                    {user?.displayName}
                  </h3>

                  <p className="text-xs text-gray-500">Welcome Back 👋</p>
                </div>
              </div>

              {/* DROPDOWN */}
              <div
                tabIndex={0}
                className="
          dropdown-content
          z-999
          mt-4
          w-72
          rounded-3xl
          overflow-hidden
          bg-white
          shadow-2xl
          border
          border-base-300
        "
              >
                {/* TOP */}
                <div className="bg-secondary px-5 py-5 text-white">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-2xl border-2 border-primary">
                        <img
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt={user?.displayName}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-bold text-lg truncate">
                        {user?.displayName}
                      </h2>

                      <p className="text-sm text-white/70 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* MENU */}
                <div className="p-3 space-y-1">
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-primary/10 transition duration-200"
                  >
                    <span>📊</span>
                    <span className="font-medium">Dashboard</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/my-parcels"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-primary/10 transition duration-200"
                  >
                    <span>📦</span>
                    <span className="font-medium">My Parcels</span>
                  </NavLink>

                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-error hover:text-white transition duration-200"
                  >
                    <span>🚪</span>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LOGIN */}
          {!user && (
            <Link
              className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-white rounded-xl px-5"
              to="/login"
            >
              Log In
            </Link>
          )}

          {/* RIDER */}
          <Link
            className="btn btn-primary text-black rounded-xl px-6 shadow hover:scale-105 transition duration-200"
            to="/rider"
          >
            Be a Rider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
