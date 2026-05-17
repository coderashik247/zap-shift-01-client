import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaCircleCheck,
  FaMoneyBillWave,
  FaTruckFast,
} from "react-icons/fa6";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "parcel_delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
      );
      return res.data;
    },
  });

  const calculatedPayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    }

    return parcel.cost * 0.6;
  };

  const totalEarning = parcels.reduce(
    (total, parcel) => total + calculatedPayout(parcel),
    0,
  );

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-primary/15 text-primary shadow-sm">
            <FaCircleCheck size={30} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-secondary">
              Completed Deliveries
            </h2>

            <p className="text-accent mt-1">
              Successfully Delivered Parcels: {parcels.length}
            </p>
          </div>
        </div>

        {/* EARNING CARD */}
        <div className="bg-primary/15 border border-primary/20 rounded-2xl px-6 py-4 min-w-62.5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary text-black">
              <FaMoneyBillWave size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>

              <h2 className="text-3xl font-bold text-secondary">
                ৳ {totalEarning.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-base-100 shadow-xl rounded-3xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-lg">
            {/* TABLE HEAD */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>SL</th>
                <th>Parcel</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Created</th>
                <th>District</th>
                <th>Cost</th>
                <th>Payout</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="[&>tr:nth-child(odd)]:bg-primary/10">
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-primary/5 transition duration-200"
                >
                  {/* SL */}
                  <th>{index + 1}</th>

                  {/* PARCEL */}
                  <td>
                    <div>
                      <h2 className="font-bold text-secondary">
                        {parcel.parcelName}
                      </h2>

                      <p className="text-xs text-gray-500">
                        Delivered Successfully
                      </p>
                    </div>
                  </td>

                  {/* SENDER */}
                  <td className="font-medium">
                    {parcel.senderName}
                  </td>

                  {/* RECEIVER */}
                  <td>{parcel.recieverName}</td>

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

                  {/* COST */}
                  <td>
                    <span className="badge badge-outline text-secondary px-4 py-3">
                      {parcel.cost}
                    </span>
                  </td>

                  {/* PAYOUT */}
                  <td>
                    <span className="badge badge-success text-white px-4 py-3">
                      {calculatedPayout(parcel)}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span className="badge badge-success text-white px-4 py-3">
                      Delivered
                    </span>
                  </td>

                  {/* ACTION */}
                  <td>
                    <div className="flex justify-center">
                      <button className="btn btn-primary text-black rounded-xl hover:scale-105 transition duration-200">
                        <FaMoneyBillWave />
                        Cash Out
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
            <div className="flex justify-center mb-5 text-primary">
              <FaTruckFast size={60} />
            </div>

            <h2 className="text-3xl font-bold text-secondary mb-3">
              No Completed Deliveries
            </h2>

            <p className="text-gray-500 text-lg">
              Delivered parcels will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedDeliveries;