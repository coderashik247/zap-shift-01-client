import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaMotorcycle,
  FaChartLine,
  FaBoxOpen,
  FaCircleCheck,
  FaCalendarDays,
} from "react-icons/fa6";

const RiderDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["rider-delivery-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/delivery-per-day?riderEmail=${user.email}`
      );
      return res.data;
    },
  });

  // TOTAL CALCULATION (SAFE)
  const totalDelivered = stats?.reduce(
    (acc, item) => acc + (item.deliveredCount || 0),
    0
  );

  // LATEST DAY (SAFE SORT)
  const latest = stats?.length
    ? stats[stats.length - 1]?.deliveredCount
    : 0;

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="bg-linear-to-r from-secondary to-[#0F3D3E] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* LEFT */}
          <div className="flex items-center gap-5">
            <div className="p-5 rounded-2xl bg-white/10">
              <FaMotorcycle size={38} />
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                Rider Dashboard
              </h2>
              <p className="text-white/70 mt-2 text-lg">
                Track your daily delivery performance
              </p>
            </div>
          </div>

          {/* TOTAL */}
          <div className="bg-white/10 border border-white/10 rounded-2xl px-6 py-5 min-w-60">
            <p className="text-white/70 text-sm">
              Total Delivered
            </p>
            <h2 className="text-5xl font-bold mt-2">
              {totalDelivered || 0}
            </h2>
          </div>

        </div>
      </div>

      {/* LOADING STATE */}
      {isLoading ? (
        <div className="text-center text-gray-500 py-10">
          Loading dashboard...
        </div>
      ) : (
        <>
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* TOTAL */}
            <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total Deliveries
                  </p>
                  <h2 className="text-4xl font-bold text-secondary mt-2">
                    {totalDelivered}
                  </h2>
                </div>
                <div className="p-4 rounded-2xl bg-primary/15 text-primary">
                  <FaBoxOpen size={26} />
                </div>
              </div>
            </div>

            {/* LATEST */}
            <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    Latest Day Delivery
                  </p>
                  <h2 className="text-4xl font-bold text-secondary mt-2">
                    {latest}
                  </h2>
                </div>
                <div className="p-4 rounded-2xl bg-green-100 text-green-600">
                  <FaCircleCheck size={26} />
                </div>
              </div>
            </div>

            {/* DAYS */}
            <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    Active Days
                  </p>
                  <h2 className="text-4xl font-bold text-secondary mt-2">
                    {stats.length}
                  </h2>
                </div>
                <div className="p-4 rounded-2xl bg-blue-100 text-blue-600">
                  <FaCalendarDays size={26} />
                </div>
              </div>
            </div>

          </div>

          {/* CHART + LIST */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* CHART */}
            <div className="xl:col-span-2 bg-base-100 rounded-3xl border border-base-300 shadow-xl p-6">

              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-primary/15 text-primary">
                  <FaChartLine size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-secondary">
                    Delivery Trend
                  </h2>
                  <p className="text-gray-500">
                    Your performance over time
                  </p>
                </div>
              </div>

              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats}>
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="deliveredCount"
                      stroke="#22C55E"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* SIDE LIST */}
            <div className="bg-base-100 rounded-3xl border border-base-300 shadow-xl p-6">

              <h2 className="text-2xl font-bold text-secondary mb-6">
                Daily Breakdown
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">

                {stats.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No delivery data found
                  </p>
                ) : (
                  stats.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center border border-base-300 rounded-2xl p-4 hover:bg-primary/5 transition"
                    >
                      <div>
                        <p className="text-sm text-gray-500">
                          {item._id}
                        </p>
                        <h3 className="text-lg font-bold text-secondary">
                          {item.deliveredCount} parcels
                        </h3>
                      </div>

                      <span className="badge badge-primary text-black">
                        Done
                      </span>
                    </div>
                  ))
                )}

              </div>

            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default RiderDashboardHome;