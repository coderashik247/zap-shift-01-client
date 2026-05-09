import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  console.log(parcelId)
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  const handlePayment = async() => {
    const paymentInfo = {
        cost: parcel.cost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName,
    }
    const res = await axiosSecure.post('/create-checkout-session', paymentInfo)

    window.location.href =res.data.url;
  }
  return (
    <div>
      <h2 className="text-2xl text-secondary">
        Please Pay ${parcel.cost} Cost: {parcel?.parcelName}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-secondary">Pay</button>
    </div>
  );
};

export default Payment;
