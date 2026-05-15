import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUserShield,
  FaUser,
  FaTrashCan,
  FaEye,
  FaMotorcycle,
} from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(searchText);
  }, 500); // 500ms delay

  return () => {
    clearTimeout(handler);
  };
}, [searchText]);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${debouncedSearch}`);
      return res.data;
    },
  });

  // Change Role
  const handleRoleChange = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });

      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `User role updated to ${role}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete User
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${id}`);

        if (res.data.deletedCount > 0) {
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "User deleted successfully.",
            icon: "success",
          });
        }
      }
    });
  };

  // View User
  const handleView = (user) => {
    Swal.fire({
      showConfirmButton: false,
      showCloseButton: true, // built-in close button
      background: "#ffffff",
      html: `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        padding:10px;
        font-family: sans-serif;
      ">

        <img 
          src="${user.photoURL}" 
          style="
            width:100px;
            height:100px;
            border-radius:50%;
            object-fit:cover;
            border:4px solid #CAEB66;
            margin-bottom:10px;
          "
        />

        <h2 style="margin:0; font-size:20px;">
          ${user.displayName}
        </h2>

        <p style="color:#6b7280; font-size:13px;">
          ${user.email}
        </p>

        <div style="
          width:100%;
          text-align:left;
          background:#f9fafb;
          padding:12px;
          border-radius:10px;
          margin-top:10px;
        ">
          <p><strong>Role:</strong> ${user.role}</p>
          <p><strong>Created:</strong> ${new Date(user.createdAt).toLocaleString()}</p>
        </div>

      </div>
    `,
      footer: `
      <button id="closeBtn" class="swal2-confirm swal2-styled" style="background:#CAEB66;">
        Close
      </button>
    `,
      didOpen: () => {
        document.getElementById("closeBtn").addEventListener("click", () => {
          Swal.close();
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-primary/15 text-primary shadow-sm">
          <FaUserShield size={30} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-secondary">User Management</h2>

          <p className="text-accent mt-1">Total Users: {users.length}</p>
        </div>
      </div>
      <div className="w-full lg:w-[320px] mb-4">
        <label className="input input-bordered flex items-center gap-2 rounded-2xl shadow-sm focus-within:border-primary">
          {/* SEARCH ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5.5 5.5 0 1 1 1.06-1.06l3.755 3.754a.75.75 0 1 1-1.06 1.06l-3.755-3.754ZM10.5 6.5a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z"
              clipRule="evenodd"
            />
          </svg>

          {/* INPUT */}
          <input
            type="text"
            className="grow"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search users..."
          />
        </label>
      </div>

      {/* TABLE CARD */}
      <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-lg">
            {/* TABLE HEAD */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>SL</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Admin Actions</th>
                <th>Other Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="[&>tr:nth-child(odd)]:bg-primary/15">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-primary/10 transition duration-200"
                >
                  <th>{index + 1}</th>

                  {/* USER INFO */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-14 rounded-full border-2 border-primary overflow-hidden">
                          <img
                            src={
                              user.photoURL ||
                              "https://i.ibb.co/4pDNDk1/avatar.png"
                            }
                            alt={user.displayName}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.target.src =
                                "https://i.ibb.co/4pDNDk1/avatar.png";
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-secondary">
                          {user.displayName}
                        </h3>

                        <p className="text-xs text-gray-500">
                          Joined:{" "}
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="font-medium">{user.email}</td>

                  {/* ROLE */}
                  <td>
                    <span
                      className={`badge px-4 py-3 text-sm font-semibold ${
                        user.role === "admin"
                          ? "badge-error text-white"
                          : user.role === "rider"
                            ? "badge-warning text-black"
                            : "badge-info text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* ADMIN ACTIONS */}
                  <td>
                    <div className="flex flex-wrap gap-2 ">
                      {/* ADMIN BUTTON */}
                      {user.role === "admin" ? (
                        <button
                          onClick={() => handleRoleChange(user._id, "user")}
                          className="btn btn-sm bg-error text-white border-none hover:scale-105 transition"
                        >
                          <FiShieldOff />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(user._id, "admin")}
                          className="btn btn-sm bg-secondary text-white border-none hover:scale-105 transition"
                        >
                          <FaUserShield />
                        </button>
                      )}
                    </div>
                  </td>

                  {/* OTHER ACTIONS */}
                  <td>
                    <div className="flex justify-center gap-2">
                      {/* VIEW */}
                      <button
                        onClick={() => handleView(user)}
                        className="btn btn-square btn-sm btn-ghost hover:bg-info hover:text-white transition"
                      >
                        <FaEye />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-square btn-sm btn-ghost hover:bg-error hover:text-white transition"
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {users.length === 0 && (
          <div className="py-16 text-center">
            <div className="flex justify-center mb-4 text-primary">
              <FaUser size={50} />
            </div>

            <h3 className="text-2xl font-semibold text-secondary mb-2">
              No Users Found
            </h3>

            <p className="text-gray-500">Registered users will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
