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
        <NavLink to="/" className={navLinkClass}>Services</NavLink>
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
        <div className="navbar-end gap-3">
          {/* User Image */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-11 rounded-full border-2 border-primary">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-3 shadow bg-base-100 rounded-box w-60"
              >
                <li className="font-bold text-secondary">
                  {user?.displayName}
                </li>

                <li className="text-xs opacity-70">{user?.email}</li>

                <li className="mt-2">
                  <button
                    onClick={handleLogOut}
                    className="btn btn-error btn-sm text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Login */}
          {!user && (
            <Link
              className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-white"
              to="/login"
            >
              Log In
            </Link>
          )}

          {/* Rider */}
          <Link
            className="btn btn-primary text-black rounded-xl px-6"
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
