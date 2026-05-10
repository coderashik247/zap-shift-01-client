import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUserCheck,
  FaUserXmark,
  FaTrashCan,
  FaMotorcycle,
} from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

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
      text: "This parcel will be permanently deleted!",
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
              text: "Parcel deleted successfully.",
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
      {/* HEADER (same style as MyParcels) */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-primary/15 text-primary shadow-sm">
          <FaMotorcycle size={30} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-secondary">Rider Requests</h2>
          <p className="text-accent mt-1">Total Riders: {riders.length}</p>
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
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="[&>tr:nth-child(odd)]:bg-primary/15">
              {riders.map((rider, index) => (
                <tr key={rider._id} className="hover:bg-primary/10 transition">
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

                  {/* ACTIONS */}
                  <td>
                    <div className="flex justify-center gap-2">
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
    </div>
  );
};

export default ApproveRiders;
