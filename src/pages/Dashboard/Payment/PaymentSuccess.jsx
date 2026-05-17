import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        setPaymentInfo({
          trackingId: res.data.trackingId,
          transactionId: res.data.transactionId,
        });
      });
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 w-full max-w-2xl text-center border border-green-200">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-5xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h2>

        <p className="text-gray-500 text-xl mb-6">
          Your payment has been processed successfully.
        </p>

        {/* Info Box */}
        <div className="bg-base-200 rounded-lg p-4 text-left space-y-2">

          <p className="text-xl">
            <span className="font-semibold">Tracking ID:</span>
            <span className="text-primary">
              {paymentInfo.trackingId || "Loading..."}
            </span>
          </p>

          <p className="text-xl">
            <span className="font-semibold">Transaction ID:</span>
            <span className="text-secondary">
              {paymentInfo.transactionId || "Loading..."}
            </span>
          </p>

        </div>

        {/* Button */}
        < Link to="/dashboard" className="btn btn-primary mt-6 w-full">
          Go to Dashboard
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccess;