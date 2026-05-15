import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router";
import riderImage from "../../assets/images/agent-pending.png";

const RiderRegister = () => {
  const { register, handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regionDuplicate = serviceCenters.map((c) => c.region);

  const region = [...new Set(regionDuplicate)];

  const riderRegion = useWatch({ name: "region", control });
  const riderByRegion = (region) => {
    const regionDistrict = serviceCenters.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. We will reach to you in 145 days",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      {/* Title */}
      <h2 className="text-4xl font-bold text-[#0F1D3A]">Be a Rider</h2>
      <p className="text-gray-600 mt-2 max-w-xl">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      {/* Main Layout */}
      <div className="grid md:grid-cols-2 gap-10 mt-10 items-start">
        {/* LEFT SIDE FORM */}
        <div>
          <h3 className="text-2xl font-semibold mb-5">
            Tell us about yourself
          </h3>

          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className="font-semibold text-sm">Your Name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
                placeholder="Your Name"
              />
            </div>

            {/* Driving License */}
            <div>
              <label className="font-semibold text-sm">
                Driving License Number
              </label>
              <input
                type="text"
                {...register("license")}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
                placeholder="Driving License Number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold text-sm">Your Email</label>
              <input
                type="email"
                {...register("email")}
                defaultValue={user?.email}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
                placeholder="Your Email"
              />
            </div>

            {/* Region */}
            <div>
              <label className="font-semibold text-sm">Your Region</label>
              <select
                {...register("region")}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
              >
                <option>Select your Region</option>
                {region.map((r, i) => (
                  <option key={i} value={r}>
                    {" "}
                    {r}{" "}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="font-semibold text-sm">Your District</label>
              <select
                {...register("district")}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
              >
                <option>Select your District</option>
                {riderByRegion(riderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {" "}
                    {r}{" "}
                  </option>
                ))}
              </select>
            </div>

            {/* NID Number */}
            <div>
              <label className="font-semibold text-sm">NID Number</label>
              <input
                type="text"
                {...register("nid")}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
                placeholder="NID Number"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="font-semibold text-sm">Phone Number</label>
              <input
                type="text"
                {...register("phone")}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
                placeholder="Phone Number"
              />
            </div>

            {/* Bike Model */}
            <div>
              <label className="font-semibold text-sm">
                Bike Brand Model and Year
              </label>
              <input
                type="text"
                {...register("bikeModel")}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
                placeholder="Bike Brand Model and Year"
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="font-semibold text-sm">
                Bike Registration Number
              </label>
              <input
                type="text"
                {...register("bikeReg")}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
                placeholder="Bike Registration Number"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="font-semibold text-sm">
                Tell Us About Yourself
              </label>
              <textarea
                {...register("bio")}
                className="w-full border border-gray-300 rounded-md p-3 mt-1"
                placeholder="Tell Us About Yourself"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-secondary hover:text-white text-black font-semibold py-3 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src={riderImage}
            alt="Rider Illustration"
            className="w-80 md:w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default RiderRegister;
