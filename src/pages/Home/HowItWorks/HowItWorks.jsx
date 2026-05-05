import React from "react";
import { TbTruckDelivery } from "react-icons/tb";

const HowItWorks = () => {
  return (
    <div>
        <h2 className="font-bold text-3xl text-secondary ">How it Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-10">
        <div className=" bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {/* Icon */}
          <div className="mb-4">
            <TbTruckDelivery size={60} />
          </div>

          {/* Title */}
          <h3 className="text-secondary font-semibold text-xl mb-2">
            Booking Pick & Drop
          </h3>

          {/* Description */}
          <p className="text-accent text-base leading-relaxed">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className=" bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {/* Icon */}
          <div className="mb-4">
            <TbTruckDelivery size={60} />
          </div>

          {/* Title */}
          <h3 className="text-secondary font-semibold text-xl mb-2">
            Cash On Delivery
          </h3>

          {/* Description */}
          <p className="text-accent text-base leading-relaxed">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className=" bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {/* Icon */}
          <div className="mb-4">
            <TbTruckDelivery size={60} />
          </div>

          {/* Title */}
          <h3 className="text-secondary font-semibold text-xl mb-2">
            Delivery Hubs
          </h3>

          {/* Description */}
          <p className="text-accent text-base leading-relaxed">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className=" bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {/* Icon */}
          <div className="mb-4">
            <TbTruckDelivery size={60} />
          </div>

          {/* Title */}
          <h3 className="text-secondary font-semibold text-xl mb-2">
            Booking SME & Corporate
          </h3>

          {/* Description */}
          <p className="text-accent text-base leading-relaxed">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
