import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Pie,
  PieChart,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  FaBoxOpen,
  FaTruckFast,
  FaCircleCheck,
  FaClockRotateLeft,
  FaChartPie,
} from "react-icons/fa6";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["parcels-delivery-status"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/status");
      return res.data;
    },
  });

  // PIE CHART DATA
  const pieChartData = stats.map((item) => ({
    name: item._id?.split("_").join(" "),
    value: item.count,
  }));

  // COLORS
  const COLORS = [
    "#CAEB66",
    "#1F2937",
    "#22C55E",
    "#F59E0B",
    "#3B82F6",
    "#EF4444",
  ];

  // ICONS
  const getIcon = (status) => {
    if (status.includes("delivered")) {
      return <FaCircleCheck size={28} />;
    }

    if (
      status.includes("pickup") ||
      status.includes("assigned") ||
      status.includes("arriving")
    ) {
      return <FaTruckFast size={28} />;
    }

    if (status.includes("pending")) {
      return <FaClockRotateLeft size={28} />;
    }

    return <FaBoxOpen size={28} />;
  };

  return (
    <div className="p-6 space-y-8">
      {/* PAGE HEADER */}
      <div className="bg-linear-to-r from-secondary to-[#0F3D3E] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <div className="p-5 rounded-2xl bg-white/10">
              <FaChartPie size={38} />
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                Admin Dashboard
              </h2>

              <p className="text-white/70 mt-2 text-lg">
                Monitor parcel delivery analytics and status overview
              </p>
            </div>
          </div>

          {/* TOTAL STATUS */}
          <div className="bg-white/10 border border-white/10 rounded-2xl px-6 py-5 min-w-60">
            <p className="text-white/70 text-sm">
              Total Delivery Status
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {stats.length}
            </h2>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <div className="flex items-start justify-between">
              {/* LEFT */}
              <div>
                <p className="text-gray-500 text-sm capitalize">
                  {stat._id?.split("_").join(" ")}
                </p>

                <h2 className="text-5xl font-bold text-secondary mt-3">
                  {stat.count}
                </h2>
              </div>

              {/* ICON */}
              <div className="p-4 rounded-2xl bg-primary/15 text-primary">
                {getIcon(stat._id)}
              </div>
            </div>

            {/* PROGRESS */}
            <div className="mt-6">
              <progress
                className="progress progress-primary w-full"
                value={stat.count}
                max={100}
              ></progress>
            </div>
          </div>
        ))}
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* PIE CHART */}
        <div className="xl:col-span-2 bg-base-100 rounded-3xl border border-base-300 shadow-xl p-6">
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-primary/15 text-primary">
              <FaChartPie size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-secondary">
                Delivery Status Analytics
              </h2>

              <p className="text-gray-500 mt-1">
                Parcel delivery status visualization
              </p>
            </div>
          </div>

          {/* CHART */}
          <div className="w-full h-112.5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  innerRadius={80}
                  paddingAngle={5}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SUMMARY CARD */}
        <div className="bg-base-100 rounded-3xl border border-base-300 shadow-xl p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-primary/15 text-primary">
              <FaBoxOpen size={26} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary">
                Quick Summary
              </h2>

              <p className="text-gray-500">
                Delivery status breakdown
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {pieChartData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border border-base-300 rounded-2xl px-4 py-4 hover:bg-primary/5 transition duration-200"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  ></div>

                  <div>
                    <h3 className="font-semibold capitalize text-secondary">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      Parcel Status
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <span className="badge badge-primary text-black px-4 py-3">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;