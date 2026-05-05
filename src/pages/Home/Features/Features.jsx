import img1 from "../../../assets/images/live-tracking.png";
import img2 from "../../../assets/images/safe-delivery.png";
import img3 from "../../../assets/images/safe-delivery.png";

const features = [
  {
    title: "Live Parcel Tracking",
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    img: img1,
  },
  {
    title: "100% Safe Delivery",
    desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    img: img2,
  },
  {
    title: "24/7 Call Center Support",
    desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    img: img3,
  },
];

export default function Features() {
  return (
    <section className="bg-[#F4F6F4] rounded-2xl py-8 my-10">
      <div className=" mx-auto px-8 space-y-8">

        {features.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-10 flex items-center gap-10 shadow-sm"
          >
            {/* Left Image */}
            <div className="w-1/3 flex justify-center">
              <img src={item.img} className="w-40" />
            </div>

            {/* Divider Line */}
            <div className="h-40 border-l-2 border-dashed border-gray-300"></div>

            {/* Text */}
            <div className="w-2/3">
              <h3 className="text-2xl font-semibold text-[#063C3B] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
