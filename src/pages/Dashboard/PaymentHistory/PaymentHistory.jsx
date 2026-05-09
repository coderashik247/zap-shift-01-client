import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave } from "react-icons/fa6";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

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
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-primary/20 text-primary">
          <FaMoneyBillWave size={28} />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-secondary">
            Payment History
          </h2>

          <p className="text-gray-500">
            Total Payments: {payments.length}
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="table table-lg text-lg">

            {/* Head */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>SL</th>
                <th>Parcel</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Tracking ID</th>
                <th>Payment Time</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="[&>tr:nth-child(odd)]:bg-primary/25">

              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-primary/10 transition duration-200"
                >
                  <th>{index + 1}</th>

                  <td className="font-medium text-secondary">
                    {payment.parcelName}
                  </td>

                  <td>
                    <span className="badge badge-success text-white px-4 py-3">
                      ৳ {payment.amount}
                    </span>
                  </td>

                  <td>
                    <span className="font-mono text-[18px] bg-base-200 px-2 py-1 rounded">
                      {payment.transactionId}
                    </span>
                  </td>

                  <td>
                    <span className="badge badge-outline badge-primary text-secondary">
                      {payment.trackingId}
                    </span>
                  </td>

                  <td className="text-sm text-gray-500">
                    {new Date(payment.paidAt).toLocaleString()}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {payments.length === 0 && (
          <div className="py-16 text-center">
            <h3 className="text-2xl font-semibold text-secondary mb-2">
              No Payment History Found
            </h3>

            <p className="text-gray-500">
              Your completed payments will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;