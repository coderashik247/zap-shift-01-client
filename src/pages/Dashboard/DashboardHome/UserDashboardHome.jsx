import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

import {
  FaBox,
  FaCircleCheck,
  FaClock,
  FaMoneyBill,
  FaTruckFast,
} from "react-icons/fa6";

const UserDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 📦 PARCELS
  const { data: parcels = [] } = useQuery({
    queryKey: ["user-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  // 💳 PAYMENTS
  const { data: payments = [] } = useQuery({
    queryKey: ["user-payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user.email}`
      );
      return res.data;
    },
  });

  // 📊 STATS CALCULATION
  const totalParcels = parcels.length;

  const delivered = parcels.filter(
    (p) => p.deliveryStatus === "parcel_delivered"
  ).length;

  const pending = parcels.filter(
    (p) =>
      p.deliveryStatus !== "parcel_delivered"
  ).length;

  const totalSpent = payments.reduce(
    (acc, item) => acc + (item.amount || 0),
    0
  );

  const recentParcels = parcels.slice(0, 5);

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="bg-linear-to-r from-secondary to-[#0F3D3E] text-white rounded-3xl p-8 shadow-xl">
        <h2 className="text-4xl font-bold">
          Welcome Back 👋 {user?.displayName}
        </h2>
        <p className="text-white/70 mt-2">
          Here is your parcel overview
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-base-100 p-6 rounded-3xl border shadow-lg">
          <FaBox className="text-primary" size={28} />
          <p className="text-gray-500 mt-3">Total Parcels</p>
          <h2 className="text-3xl font-bold">{totalParcels}</h2>
        </div>

        <div className="bg-base-100 p-6 rounded-3xl border shadow-lg">
          <FaCircleCheck className="text-green-500" size={28} />
          <p className="text-gray-500 mt-3">Delivered</p>
          <h2 className="text-3xl font-bold">{delivered}</h2>
        </div>

        <div className="bg-base-100 p-6 rounded-3xl border shadow-lg">
          <FaClock className="text-yellow-500" size={28} />
          <p className="text-gray-500 mt-3">Pending</p>
          <h2 className="text-3xl font-bold">{pending}</h2>
        </div>

        <div className="bg-base-100 p-6 rounded-3xl border shadow-lg">
          <FaMoneyBill className="text-blue-500" size={28} />
          <p className="text-gray-500 mt-3">Total Spent</p>
          <h2 className="text-3xl font-bold">
            ${totalSpent}
          </h2>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* RECENT PARCELS */}
        <div className="xl:col-span-2 bg-base-100 p-6 rounded-3xl border shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <FaTruckFast size={24} className="text-primary" />
            <h2 className="text-2xl font-bold text-secondary">
              Recent Parcels
            </h2>
          </div>

          <div className="space-y-4">
            {recentParcels.map((parcel) => (
              <div
                key={parcel._id}
                className="flex justify-between items-center border p-4 rounded-2xl hover:bg-primary/5 transition"
              >
                <div>
                  <p className="font-semibold">
                    {parcel.parcelName || "Parcel"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Tracking: {parcel.trackingId}
                  </p>
                </div>

                <span className="badge badge-primary text-black">
                  {parcel.deliveryStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-base-100 p-6 rounded-3xl border shadow-xl">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            Quick Info
          </h2>

          <div className="space-y-4">

            <div className="p-4 rounded-2xl bg-primary/10">
              <p className="text-gray-500 text-sm">
                Account Email
              </p>
              <p className="font-semibold">
                {user?.email}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-green-100">
              <p className="text-gray-500 text-sm">
                Delivered Rate
              </p>
              <p className="font-bold text-green-600">
                {totalParcels
                  ? Math.round((delivered / totalParcels) * 100)
                  : 0}
                %
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-100">
              <p className="text-gray-500 text-sm">
                Active Shipments
              </p>
              <p className="font-bold text-blue-600">
                {pending}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboardHome;