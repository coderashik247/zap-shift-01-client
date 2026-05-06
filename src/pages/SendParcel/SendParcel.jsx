import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = watch("senderRegion");
  const recieverRegion = watch("recieverRegion");

  const districtByRegions = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendPercel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.recieverDistrict;
    const parcelWeight = data.parcelWeight;

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 30
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    console.log("Parcel Cost: ", cost);

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I Agree!",
    }).then((result) => {
      if (result.isConfirmed)

        axiosSecure.post('/parcels', data)
        .then(res =>{
            console.log("Saving the parcel data: ", res.data);
        })
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
    });
  };
  return (
    <div className="mt-5">
      <h2 className="text-5xl font-bold text-secondary mb-3">Send A Parcel</h2>
      <h5 className="text-xl font-bold text-secondary mb-2">
        Enter your parcel details
      </h5>
      <form onSubmit={handleSubmit(handleSendPercel)}>
        {/* Parcel Type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label ml-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non Document
          </label>
        </div>
        {/* Parcel Info: name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName", { required: true })}
              className="input w-full"
              placeholder="Parcel Name"
            />
            {errors.parcelName?.type === "required" && (
              <p className="text-error">Parcel Name is required</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight", { required: true })}
              className="input w-full"
              placeholder="Parcel Weight"
            />
            {errors.parcelWeight?.type === "required" && (
              <p className="text-error">Parcel Weight is required</p>
            )}
          </fieldset>
        </div>

        {/* Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* Sender Details */}
          <div>
            <fieldset className="fieldset">
              <h4 className="text-xl font-semibold text-secondary">
                Sender Details
              </h4>
              {/* Sender Name */}
              <label className="label">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full"
                placeholder="Sender Name"
                defaultValue={user.displayName}
              />
              {/* Sender Email */}
              <label className="label mt-4">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                className="input w-full"
                placeholder="Sender Email"
                defaultValue={user.email}
              />

              {/* Sender Region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Region</legend>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a Region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Sender District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender District</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a District"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegions(senderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Sender Address */}
              <label className="label mt-4">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress", { required: true })}
                className="input w-full"
                placeholder="Sender Address"
              />
              {errors.senderAddress?.type === "required" && (
                <p className="text-error">Sender Address is required</p>
              )}
            </fieldset>
          </div>
          {/* Reciever Details */}
          <div>
            <fieldset className="fieldset">
              <h4 className="text-xl font-semibold text-secondary">
                Reciever Details
              </h4>
              {/* Reciever Name */}
              <label className="label">Reciever Name</label>
              <input
                type="text"
                {...register("recieverName", { required: true })}
                className="input w-full"
                placeholder="Reciever Name"
              />
              {errors.recieverName?.type === "required" && (
                <p className="text-error">Reciever Name is required</p>
              )}
              {/* Reciever Email */}
              <label className="label mt-4">Reciever Email</label>
              <input
                type="email"
                {...register("recieverEmail", { required: true })}
                className="input w-full"
                placeholder="Reciever Email"
              />
              {errors.recieverEmail?.type === "required" && (
                <p className="text-error">Reciever Email is required</p>
              )}
              {/* Reciever Region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Reciever Region</legend>
                <select
                  {...register("recieverRegion")}
                  defaultValue="Pick a Region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Sender District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Reciever District</legend>
                <select
                  {...register("recieverDistrict")}
                  defaultValue="Pick a District"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegions(recieverRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Reciever Address */}
              <label className="label mt-4">Reciever Address</label>
              <input
                type="text"
                {...register("recieverAddress", { required: true })}
                className="input w-full"
                placeholder="Reciever Address"
              />
              {errors.recieverAddress?.type === "required" && (
                <p className="text-error">Reciever Address is required</p>
              )}
            </fieldset>
          </div>
        </div>

        <input
          className="btn btn-primary text-black"
          type="submit"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
