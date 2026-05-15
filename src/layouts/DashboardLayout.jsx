import { Outlet } from "react-router";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaMotorcycle, FaPeopleCarryBox, FaRegCreditCard } from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import { FaUsers } from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const [role] = useRole();
  console.log("User Role in the dashboard:", role);
  console.log("User Role in the dashboard:", typeof(role));
  return (
    <div className="drawer lg:drawer-open max-w-362.5 mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content bg-base-100">
        <div className="navbar bg-base-100 border-b border-base-300 px-6">
          <label htmlFor="my-drawer-4" className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <h2 className="text-lg font-bold text-secondary">
            Zap Shift Dashboard
          </h2>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="w-64 min-h-full bg-base-100 border-r border-base-300 p-5">
          {/* BRAND */}
          <div className="mb-8">
            <Link to="/" className="text-2xl font-bold text-secondary">
              Zap <span className="text-primary">Shift</span>
            </Link>
            <p className="text-xs text-gray-400">Delivery Dashboard</p>
          </div>

          {/* MENU */}
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary hover:text-black transition"
              >
                🏠 Homepage
              </Link>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-primary text-black font-semibold shadow"
                      : "hover:bg-primary hover:text-black"
                  }`
                }
              >
                <CiDeliveryTruck />
                My Parcels
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-primary text-black font-semibold shadow"
                      : "hover:bg-primary hover:text-black"
                  }`
                }
              >
                <FaRegCreditCard />
                Payment History
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                {/* Approve Riders */}
                <li>
                  <NavLink
                    to="/dashboard/approve-riders"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-primary text-black font-semibold shadow"
                          : "hover:bg-primary hover:text-black"
                      }`
                    }
                  >
                    <FaMotorcycle />
                    Approve Riders
                  </NavLink>
                </li>
                {/* Assign Riders */}
                <li>
                  <NavLink
                    to="/dashboard/assign-riders"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-primary text-black font-semibold shadow"
                          : "hover:bg-primary hover:text-black"
                      }`
                    }
                  >
                    <FaPeopleCarryBox/>
                    Assign Riders
                  </NavLink>
                </li>
                {/* User Management */}
                <li>
                  <NavLink
                    to="/dashboard/user-management"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-primary text-black font-semibold shadow"
                          : "hover:bg-primary hover:text-black"
                      }`
                    }
                  >
                    <FaUsers />
                    User Management
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
