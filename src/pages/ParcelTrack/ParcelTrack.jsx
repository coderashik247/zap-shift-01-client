import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import {
  FaBoxOpen,
  FaLocationDot,
  FaTruckFast,
  FaCircleCheck,
} from "react-icons/fa6";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  // ICON CHANGE BASED ON STATUS
  const getTrackingIcon = (status) => {
    const lowerStatus = status?.toLowerCase();

    if (lowerStatus.includes("delivered")) {
      return <FaCircleCheck className="text-success text-lg" />;
    }

    if (
      lowerStatus.includes("picked") ||
      lowerStatus.includes("transit") ||
      lowerStatus.includes("arriving")
    ) {
      return <FaTruckFast className="text-primary text-lg" />;
    }

    if (
      lowerStatus.includes("received") ||
      lowerStatus.includes("warehouse")
    ) {
      return <FaLocationDot className="text-warning text-lg" />;
    }

    return <FaBoxOpen className="text-secondary text-lg" />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10">
      {/* HEADER */}
      <div className="bg-linear-to-r from-secondary to-[#0F3D3E] text-white rounded-3xl p-8 shadow-xl mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <div className="p-5 rounded-2xl bg-white/10">
              <FaTruckFast size={35} />
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                Parcel Tracking
              </h2>

              <p className="text-white/70 mt-2">
                Track your parcel delivery progress in real time
              </p>
            </div>
          </div>

          {/* TRACKING ID */}
          <div className="bg-white/10 rounded-2xl px-6 py-4 border border-white/10">
            <p className="text-sm text-white/70 mb-1">
              Tracking ID
            </p>

            <h3 className="text-xl font-bold break-all">
              {trackingId}
            </h3>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {/* TOTAL LOGS */}
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-primary/15 text-primary">
              <FaBoxOpen size={28} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Total Tracking Logs
              </p>

              <h2 className="text-3xl font-bold text-secondary">
                {trackings.length}
              </h2>
            </div>
          </div>
        </div>

        {/* CURRENT STATUS */}
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-success/15 text-success">
              <FaTruckFast size={28} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Current Status
              </p>

              <h2 className="text-xl font-bold text-secondary">
                {trackings[0]?.status || "Tracking Started"}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE CARD */}
      <div className="bg-base-100 border border-base-300 rounded-3xl shadow-xl p-6 lg:p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary">
            Delivery Timeline
          </h2>

          <p className="text-gray-500 mt-2">
            Complete parcel tracking history
          </p>
        </div>

        {/* EMPTY */}
        {trackings.length === 0 ? (
          <div className="py-20 text-center">
            <div className="flex justify-center mb-5 text-primary">
              <FaBoxOpen size={60} />
            </div>

            <h2 className="text-3xl font-bold text-secondary mb-3">
              No Tracking Logs Found
            </h2>

            <p className="text-gray-500 text-lg">
              Tracking updates will appear here.
            </p>
          </div>
        ) : (
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {trackings.map((log, index) => (
              <li key={log._id}>
                {index !== 0 && <hr className="bg-primary/30" />}

                {/* DATE */}
                <div className="timeline-start text-sm text-gray-500 font-medium">
                  {new Date(log.createdAt).toLocaleString()}
                </div>

                {/* ICON */}
                <div className="timeline-middle bg-base-100 p-2 rounded-full border-2 border-primary shadow-sm">
                  {getTrackingIcon(log.details)}
                </div>

                {/* CONTENT */}
                <div className="timeline-end timeline-box border border-base-300 shadow-md rounded-2xl p-5 mb-10 hover:border-primary hover:bg-primary/5 transition duration-200">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-xl font-bold text-secondary">
                        {log.status || "Parcel Update"}
                      </h3>

                      <p className="text-gray-600 mt-2 leading-relaxed">
                        {log.details}
                      </p>
                    </div>

                    <span className="badge badge-primary text-black px-4 py-3">
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {index !== trackings.length - 1 && (
                  <hr className="bg-primary/30" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ParcelTrack;