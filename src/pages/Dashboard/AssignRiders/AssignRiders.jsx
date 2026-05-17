import React, { useRef, useState } from "react";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const profileModalRef = useRef();

  const [selectedParcel, setSelectedParcel] = useState(null); // STATE
  const [selectedRider, setSelectedRider] = useState(null);

  // FETCH PENDING PARCELS
  const { data: parcels = [], refetch: riderRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );

      return res.data;
    },
  });

  // FETCH AVAILABLE RIDERS
  const { data: riders = [], refetch: parcelRefetch } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStats=available`,
      );

      return res.data;
    },
  });

  //HANDLE FIND RIDER OPEN MODAL
  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  // HANDLE VIEW PROFILE
  const handleViewProfile = (rider) => {
    setSelectedRider(rider);
    profileModalRef.current.showModal();
  };

  // HANDLE ASSIGN RIDER
  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          parcelRefetch();
          riderRefetch();
          Swal.fire({
            title: "Rider Assigned!",
            text: `${rider.name} has been assigned to this parcel.`,
            icon: "success",
          });
          riderModalRef.current.close();
        }
      });
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-primary/15 text-primary shadow-sm">
          <FaPeopleCarryBox size={30} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-secondary">Assign Riders</h2>

          <p className="text-accent mt-1">
            Pending Pickup Parcels: {parcels.length}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-lg">
            {/* TABLE HEAD */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>SL</th>
                <th>Parcel Name</th>
                <th>Cost</th>
                <th>Created At</th>
                <th>Pickup District</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="[&>tr:nth-child(odd)]:bg-primary/15">
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-primary/10 transition duration-200"
                >
                  <th>{index + 1}</th>

                  {/* PARCEL */}
                  <td>
                    <div>
                      <h3 className="font-bold text-secondary">
                        {parcel.parcelName}
                      </h3>

                      <p className="text-xs text-gray-500">Tracking Pending</p>
                    </div>
                  </td>

                  {/* COST */}
                  <td>
                    <span className="badge badge-outline text-secondary px-4 py-3">
                      ৳ {parcel.cost}
                    </span>
                  </td>

                  {/* CREATED */}
                  <td className="text-sm">
                    {new Date(parcel.createdAt).toLocaleDateString()}
                  </td>

                  {/* DISTRICT */}
                  <td>
                    <span className="badge badge-primary text-black px-4 py-3">
                      {parcel.senderDistrict}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td>
                    <div className="flex justify-center">
                      <button
                        onClick={() => openAssignRiderModal(parcel)}
                        className="btn btn-primary text-black rounded-xl hover:scale-105 transition duration-200"
                      >
                        Find Riders
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
          <div className="py-16 text-center">
            <div className="flex justify-center mb-4 text-primary">
              <FaPeopleCarryBox size={50} />
            </div>

            <h3 className="text-2xl font-semibold text-secondary mb-2">
              No Pending Parcels
            </h3>

            <p className="text-gray-500">
              Pending pickup parcels will appear here.
            </p>
          </div>
        )}
      </div>

      {/* RIDER MODAL */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-4xl p-0 overflow-hidden rounded-3xl border border-base-300">
          {/* HEADER */}
          <div className="bg-secondary text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/10">
                <FaPeopleCarryBox size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-bold">Available Riders</h3>

                <p className="text-sm text-white/70 mt-1">
                  District: {selectedParcel?.senderDistrict}
                </p>
              </div>
            </div>

            <div className="badge badge-primary text-black badge-lg">
              {riders.length} Riders
            </div>
          </div>

          {/* BODY */}
          <div className="p-6">
            {riders.length > 0 ? (
              <div className="space-y-4 max-h-75 overflow-y-auto pr-1">
                {riders.map((rider) => (
                  <div
                    key={rider._id}
                    className="border border-base-300 rounded-2xl p-5 hover:border-primary hover:bg-primary/5 transition duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                      {/* LEFT */}
                      <div className="flex items-center justify-center">
                        <div>
                          <h2 className="text-xl font-bold text-secondary">
                            {rider?.name}
                          </h2>

                          <p className="text-sm text-gray-500 mt-1">
                            {rider?.email}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 mt-4">
                            {/* DISTRICT */}
                            <span className="badge badge-primary text-black px-4 py-3">
                              {rider?.district}
                            </span>

                            {/* STATUS */}
                            <span
                              className={`badge px-4 py-3 ${
                                rider?.status === "approved"
                                  ? "badge-success text-white"
                                  : "badge-warning text-black"
                              }`}
                            >
                              {rider?.status}
                            </span>

                            {/* WORK STATUS */}
                            <span className="badge badge-outline px-4 py-3">
                              {rider?.workStats || "available"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewProfile(rider)}
                          className="btn btn-outline rounded-xl"
                        >
                          View Profile
                        </button>

                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-primary text-black rounded-xl hover:scale-105 transition duration-200"
                        >
                          Assign Rider
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="flex justify-center text-primary mb-5">
                  <FaPeopleCarryBox size={55} />
                </div>

                <h3 className="text-2xl font-bold text-secondary mb-2">
                  No Riders Available
                </h3>

                <p className="text-gray-500">
                  No approved riders found in this district.
                </p>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t border-base-300 px-6 py-4 bg-base-100">
            <div className="modal-action mt-0">
              <form method="dialog">
                <button className="btn rounded-xl px-6">Close</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      {/* RIDER PROFILE MODAL */}
      <dialog
        ref={profileModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-3xl border border-base-300">
          {/* HEADER */}
          <div className="bg-secondary text-white px-6 py-5 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Rider Profile</h3>

              <p className="text-sm text-white/70 mt-1">
                Detailed Rider Information
              </p>
            </div>

            <div className="badge badge-primary text-black badge-lg">
              {selectedRider?.status}
            </div>
          </div>

          {/* BODY */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* NAME */}
              <div className="bg-base-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <h2 className="font-bold text-secondary text-lg">
                  {selectedRider?.name}
                </h2>
              </div>

              {/* EMAIL */}
              <div className="bg-base-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <h2 className="font-semibold">{selectedRider?.email}</h2>
              </div>

              {/* DISTRICT */}
              <div className="bg-base-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">District</p>
                <h2 className="font-semibold">{selectedRider?.district}</h2>
              </div>

              {/* REGION */}
              <div className="bg-base-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Region</p>
                <h2 className="font-semibold">{selectedRider?.region}</h2>
              </div>

              {/* WORK STATUS */}
              <div className="bg-base-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Work Status</p>

                <span className="badge badge-success text-white">
                  {selectedRider?.workStats || "available"}
                </span>
              </div>

              {/* PHONE */}
              <div className="bg-base-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <h2 className="font-semibold">{selectedRider?.phone}</h2>
              </div>

              {/* BIKE MODEL */}
              <div className="bg-base-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Bike Model</p>
                <h2 className="font-semibold">{selectedRider?.bikeModel}</h2>
              </div>

              {/* BIKE REG */}
              <div className="bg-base-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Bike Registration</p>
                <h2 className="font-semibold">{selectedRider?.bikeReg}</h2>
              </div>

              {/* LICENSE */}
              <div className="bg-base-200 rounded-2xl p-4 md:col-span-2">
                <p className="text-xs text-gray-500 mb-1">License Number</p>
                <h2 className="font-semibold">{selectedRider?.license}</h2>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-base-300 px-6 py-4 bg-base-100">
            <div className="modal-action mt-0">
              <form method="dialog">
                <button className="btn rounded-xl px-6">Close</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
