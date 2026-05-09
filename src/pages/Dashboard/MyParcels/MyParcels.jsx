import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {refetch, data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your parcel has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  const handlePayment = async(parcel) => {
    console.log(parcel);
    const paymentInfo = {
        parcelId :parcel._id,
        senderEmail : parcel.senderEmail,
        cost : parcel.cost,
        parcelName: parcel.parcelName
    }

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo)

    window.location.href = res.data.url;
  }

  return (
    <div>
      <h2>My Parcels are: {parcels.length} </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-secondary font-bold">
              <th>SL</th>
              <th>Receiver Name</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(odd)]:bg-primary/40">
            {/* row 1 */}

            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.recieverName}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="badge badge-success text-white">Paid</span>
                  ) : (
                    <button onClick={() => handlePayment(parcel) } className="btn btn-primary btn-sm text-black">Pay</button>
                    // <Link to={`/dashboard/payment/${parcel._id}`} className="btn btn-primary btn-sm text-black">
                    //   Pay
                    // </Link>
                  )}
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  <button className="btn btn-square hover:bg-info hover:text-white hover:scale-115 transition duration-200">
                    <FaMagnifyingGlass />
                  </button>

                  <button className="btn btn-square hover:bg-warning hover:text-white hover:scale-115 transition duration-200 mx-2">
                    <FiEdit />
                  </button>

                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-error hover:text-white hover:scale-115 transition duration-200"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
