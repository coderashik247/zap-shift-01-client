import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaBoxOpen,
  FaCheck,
  FaLocationDot,
  FaTruckFast,
} from "react-icons/fa6";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );

      return res.data;
    },
  });

  // UPDATE DELIVERY STATUS
  const handleDeliveryStatusUpdate = (parcel, status) => {
    const message = `Parcel status updated to ${status.replaceAll("_", " ")}`;

    const statusInfo = { deliveryStatus: status };

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            title: "Success!",
            text: message,
            icon: "success",
            confirmButtonColor: "#CAEB66",
          });
        }
      });
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-primary/15 text-primary shadow-sm">
          <FaTruckFast size={30} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-secondary">
            Assigned Deliveries
          </h2>

          <p className="text-accent mt-1">
            Total Assigned Parcels: {parcels.length}
          </p>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-base-100 shadow-xl rounded-3xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-md">
            {/* TABLE HEAD */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>SL</th>
                <th>Parcel</th>
                <th>Receiver</th>
                <th>District</th>
                <th>Status</th>
                <th>Confirm</th>
                <th>Delivery Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="[&>tr:nth-child(odd)]:bg-primary/10">
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-primary/15 transition duration-200"
                >
                  {/* SL */}
                  <th>{index + 1}</th>

                  {/* PARCEL */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <FaBoxOpen size={18} />
                      </div>

                      <div>
                        <h2 className="font-bold text-secondary">
                          {parcel.parcelName}
                        </h2>

                        <p className="text-xs text-gray-500">
                          Tracking ID:{" "}
                          {parcel.trackingId || "Not Generated"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* RECEIVER */}
                  <td>
                    <div>
                      <h3 className="font-semibold">
                        {parcel.recieverName}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {parcel.recieverPhone}
                      </p>
                    </div>
                  </td>

                  {/* DISTRICT */}
                  <td>
                    <span className="badge badge-primary text-black px-4 py-3">
                      {parcel.recieverDistrict}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span className="badge badge-warning text-black capitalize px-4 py-3">
                      {parcel.deliveryStatus.replaceAll("_", " ")}
                    </span>
                  </td>

                  {/* CONFIRM */}
                  <td>
                    {parcel.deliveryStatus === "driver_assigned" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleDeliveryStatusUpdate(
                              parcel,
                              "driver_arriving"
                            )
                          }
                          className="btn btn-success btn-sm text-white rounded-xl"
                        >
                          Accept
                        </button>

                        <button className="btn btn-warning btn-sm text-black rounded-xl">
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="badge badge-success text-white px-4 py-3">
                        Accepted
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="flex flex-col lg:flex-row gap-2">
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(
                            parcel,
                            "parcel_picked_up"
                          )
                        }
                        className="btn btn-outline btn-primary rounded-xl btn-sm"
                      >
                        <FaLocationDot />
                        Picked Up
                      </button>

                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(
                            parcel,
                            "parcel_delivered"
                          )
                        }
                        className="btn btn-primary text-black rounded-xl btn-sm"
                      >
                        <FaCheck />
                        Delivered
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {parcels.length === 0 && (
          <div className="py-20 text-center">
            <div className="flex justify-center text-primary mb-5">
              <FaTruckFast size={55} />
            </div>

            <h3 className="text-2xl font-bold text-secondary mb-2">
              No Assigned Deliveries
            </h3>

            <p className="text-gray-500">
              Assigned parcels will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedDeliveries;