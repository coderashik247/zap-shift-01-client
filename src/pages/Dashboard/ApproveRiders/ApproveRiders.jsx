import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUserCheck,
  FaUserXmark,
  FaTrashCan,
  FaMotorcycle,
  FaEye,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  // 🔥 MODAL STATE
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    isLoading,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };

    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleAccept = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Rider deleted successfully.",
              icon: "success",
            });
          }
        });
      }
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
          <FaMotorcycle size={30} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-secondary">
            Rider Requests
          </h2>

          <p className="text-accent mt-1">
            Total Riders: {riders.length}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-lg text-lg">
            {/* HEAD */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Email</th>
                <th>District</th>
                <th>Application Status</th>
                <th>Work Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="[&>tr:nth-child(odd)]:bg-primary/15">
              {riders.map((rider, index) => (
                <tr
                  key={rider._id}
                  className="hover:bg-primary/10 transition"
                >
                  <th>{index + 1}</th>

                  <td className="font-medium">{rider.name}</td>

                  <td className="text-secondary">{rider.email}</td>

                  <td>
                    <span className="badge badge-outline">
                      {rider.district}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`badge ${
                        rider.status === "pending"
                          ? "badge-warning"
                          : rider.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      } text-black`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        rider.workStats === "available"
                          ? "badge-warning"
                          : rider.workStats === "in_delivery"
                          ? "badge-success"
                          : "badge-error"
                      } text-black`}
                    >
                      {rider.workStats}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="flex justify-center gap-2">
                      {/* VIEW */}
                      <button
                        onClick={() => setSelectedRider(rider)}
                        className="btn btn-square btn-lg btn-ghost hover:bg-info hover:text-white transition"
                      >
                        <FaEye />
                      </button>

                      {/* ACCEPT */}
                      <button
                        onClick={() => handleAccept(rider)}
                        className="btn btn-square btn-lg btn-ghost hover:bg-success hover:text-white transition"
                      >
                        <FaUserCheck />
                      </button>

                      {/* REJECT */}
                      <button
                        onClick={() => handleReject(rider)}
                        className="btn btn-square btn-lg btn-ghost hover:bg-warning hover:text-black transition"
                      >
                        <FaUserXmark />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(rider._id)}
                        className="btn btn-square btn-lg btn-ghost hover:bg-error hover:text-white transition"
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
        {riders.length === 0 && (
          <div className="py-16 text-center">
            <h3 className="text-2xl font-semibold text-secondary mb-2">
              No Rider Requests
            </h3>

            <p className="text-gray-500">
              New rider applications will appear here.
            </p>
          </div>
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedRider && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box rounded-3xl border border-primary/20">
            {/* TOP */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/15 text-primary p-4 rounded-2xl">
                <FaMotorcycle size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-secondary">
                  Rider Details
                </h3>

                <p className="text-sm text-accent">
                  Complete rider information
                </p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="space-y-4">
              {/* NAME */}
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">Full Name</p>

                <h4 className="text-lg font-semibold text-secondary">
                  {selectedRider.name}
                </h4>
              </div>

              {/* EMAIL */}
              <div className="bg-base-200 rounded-xl p-4 flex items-center gap-3">
                <FaEnvelope className="text-primary" />

                <div>
                  <p className="text-sm text-gray-500">Email</p>

                  <p className="font-medium">{selectedRider.email}</p>
                </div>
              </div>

              {/* PHONE */}
              <div className="bg-base-200 rounded-xl p-4 flex items-center gap-3">
                <FaPhone className="text-primary" />

                <div>
                  <p className="text-sm text-gray-500">Phone</p>

                  <p className="font-medium">
                    {selectedRider.phone || "Not Provided"}
                  </p>
                </div>
              </div>

              {/* DISTRICT */}
              <div className="bg-base-200 rounded-xl p-4 flex items-center gap-3">
                <FaLocationDot className="text-primary" />

                <div>
                  <p className="text-sm text-gray-500">District</p>

                  <p className="font-medium">
                    {selectedRider.district}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-2">
                  Current Status
                </p>

                <span
                  className={`badge badge-lg ${
                    selectedRider.status === "pending"
                      ? "badge-warning"
                      : selectedRider.status === "approved"
                      ? "badge-success"
                      : "badge-error"
                  } text-black`}
                >
                  {selectedRider.status}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="modal-action">
              <button
                onClick={() => setSelectedRider(null)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ApproveRiders;