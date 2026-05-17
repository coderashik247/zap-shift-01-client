import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    FaBoxOpen,
  FaMagnifyingGlass,
  FaMoneyBillWave,
  FaTrashCan,
} from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    isLoading,
    data: parcels = [],
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Delete Parcel
  const handleParcelDelete = (id) => {
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
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
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

  // Payment
  const handlePayment = async (parcel) => {
    try {
      const paymentInfo = {
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        cost: parcel.cost,
        parcelName: parcel.parcelName,
        trackingId: parcel.trackingId,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Something went wrong!",
      });
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {/* Icon */}
        <div className="p-4 rounded-2xl bg-primary/15 text-primary shadow-sm">
          <FaBoxOpen size={30} />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-secondary leading-tight">
            My Parcels
          </h2>

          <p className="text-accent mt-1">Total Parcels: {parcels.length}</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-lg">
            {/* Table Head */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>SL</th>
                <th>Receiver</th>
                <th>Parcel</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="[&>tr:nth-child(odd)]:bg-primary/15">
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-primary/10 transition duration-200"
                >
                  <th>{index + 1}</th>

                  <td className="font-medium">{parcel.recieverName}</td>

                  <td className="text-secondary font-semibold">
                    {parcel.parcelName}
                  </td>

                  <td>
                    <span className="badge badge-outline text-secondary">
                      ৳ {parcel.cost}
                    </span>
                  </td>

                  {/* Payment */}
                  <td>
                    {parcel.paymentStatus === "paid" ? (
                      <span className="badge badge-success text-white px-4 py-3">
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePayment(parcel)}
                        className="btn btn-primary btn-sm text-black hover:scale-105 transition"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>

                  {/* Delivery Status */}
                  <td>
                    <span className="badge badge-warning text-black">
                      {parcel.deliveryStatus || "Pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <button className="btn btn-square btn-sm btn-ghost hover:bg-info hover:text-white hover:scale-110 transition duration-200">
                        <FaMagnifyingGlass />
                      </button>

                      {/* Edit */}
                      <button className="btn btn-square btn-sm btn-ghost hover:bg-warning hover:text-white hover:scale-110 transition duration-200">
                        <FiEdit />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleParcelDelete(parcel._id)}
                        className="btn btn-square btn-sm btn-ghost hover:bg-error hover:text-white hover:scale-110 transition duration-200"
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

        {/* Empty State */}
        {parcels.length === 0 && (
          <div className="py-16 text-center">
            <h3 className="text-2xl font-semibold text-secondary mb-2">
              No Parcels Found
            </h3>

            <p className="text-gray-500">
              Your created parcels will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyParcels;
